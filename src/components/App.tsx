import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Wrapper,
  Column,
  Columns,
  PopoverContainer,
  Footer,
  Link,
  Header,
  Title,
} from "./elements";
import {
  Card,
  Classes,
  FormGroup,
  Popover,
  Button,
  Slider,
  MenuItem,
  H4,
  Callout,
  Icon,
} from "@blueprintjs/core";
import padLeft from "../utils/padLeft";
import { Select, ItemRenderer } from "@blueprintjs/select";
import store from "store";

export enum Weekday {
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
  Sunday = "sunday",
}

export const allWeekdays = [
  Weekday.Monday,
  Weekday.Tuesday,
  Weekday.Wednesday,
  Weekday.Thursday,
  Weekday.Friday,
  Weekday.Saturday,
  Weekday.Sunday,
];

const restore = (): Config | undefined => {
  return store.get("config");
};

const save = (config: Config) => {
  store.set("config", config);
};

const WeekdaySelect = Select.ofType<Weekday>();

const displayWeekday = (day: Weekday) =>
  day.replace(/^(.)(.*)$/, (all, first, rest) => first.toUpperCase() + rest);

const displayHour = (val: number) => `${padLeft(val, 2, "0")}H00`;

const renderWeekday: ItemRenderer<Weekday> = (
  item,
  { handleClick, modifiers }
) => {
  return (
    <MenuItem
      active={modifiers.active}
      key={item}
      onClick={handleClick}
      text={displayWeekday(item)}
    />
  );
};

type Config = {
  startHour: number;
  startWeekday: Weekday;
  endHour: number;
  days: number;
  sleepTime: number;
};

const DEFAULT_CONFIG: Config = {
  startWeekday: Weekday.Thursday,
  startHour: 17,
  endHour: 8,
  days: 4,
  sleepTime: 12,
};

export const App: React.FC<{}> = () => {
  const [config, setConfig] = useState<Config>(() => {
    return restore() ?? DEFAULT_CONFIG;
  });

  useEffect(() => {
    save(config);
  }, [config]);

  const setStartWeekday = useCallback(
    (startWeekday) => setConfig((prev) => ({ ...prev, startWeekday })),
    []
  );
  const setStartHour = useCallback(
    (startHour) => setConfig((prev) => ({ ...prev, startHour })),
    []
  );
  const setEndHour = useCallback(
    (endHour) => setConfig((prev) => ({ ...prev, endHour })),
    []
  );
  const setDays = useCallback(
    (days) => setConfig((prev) => ({ ...prev, days })),
    []
  );
  const setSleepTime = useCallback(
    (sleepTime) => setConfig((prev) => ({ ...prev, sleepTime })),
    []
  );

  const endWeekday = useMemo(() => {
    const startDayIndex = allWeekdays.indexOf(config.startWeekday);
    const endDayIndex = (startDayIndex + config.days) % allWeekdays.length;
    return allWeekdays[endDayIndex];
  }, [config.days, config.startWeekday]);

  const numberOfNights = useMemo(() => config.days - 1, [config.days]);

  const totalHours = useMemo(
    () => 24 - config.startHour + (config.days - 1) * 24 + config.endHour,
    [config.days, config.endHour, config.startHour]
  );

  const dayLength = useMemo(
    () => totalHours / numberOfNights,
    [numberOfNights, totalHours]
  );

  const planning = useMemo(() => {
    const startDayIndex = allWeekdays.indexOf(config.startWeekday);
    const extendedDayLength = Math.floor(totalHours / numberOfNights);
    const longerDays = totalHours - extendedDayLength * numberOfNights;
    let acc = config.startHour;
    return new Array(numberOfNights).fill(null).map((_, index) => {
      const dayLength = extendedDayLength + (index < longerDays ? 1 : 0);
      acc += dayLength;
      const upHour = acc;
      const downHour = upHour - config.sleepTime;
      const upLength = dayLength - config.sleepTime;
      const upDayIndex =
        (startDayIndex + Math.floor(upHour / 24)) % allWeekdays.length;
      const downDayIndex =
        (startDayIndex + Math.floor(downHour / 24)) % allWeekdays.length;

      return {
        up: {
          hour: upHour % 24,
          day: allWeekdays[upDayIndex],
          duration: upLength,
        },
        down: {
          hour: downHour % 24,
          day: allWeekdays[downDayIndex],
          duration: config.sleepTime,
        },
      };
    });
  }, [
    config.sleepTime,
    config.startHour,
    config.startWeekday,
    numberOfNights,
    totalHours,
  ]);

  return (
    <Wrapper className={Classes.DARK}>
      <Header>
        <Title>
          Sleep Cycle Reset &nbsp; <Icon icon="refresh" iconSize={25} />
        </Title>
      </Header>
      <Columns>
        <Column>
          <Card>
            <FormGroup inline={true} label="What's the day today ?">
              <WeekdaySelect
                filterable={false}
                items={allWeekdays}
                itemRenderer={renderWeekday}
                onItemSelect={(selected) => setStartWeekday(selected)}
              >
                <Button rightIcon="double-caret-vertical">
                  {displayWeekday(config.startWeekday)}
                </Button>
              </WeekdaySelect>
            </FormGroup>
            <FormGroup
              inline={true}
              label="At what time did you woke up today ?"
            >
              <Popover>
                <Button>{displayHour(config.startHour)}</Button>
                <PopoverContainer>
                  <Slider
                    value={config.startHour}
                    min={0}
                    max={23}
                    onChange={setStartHour}
                    labelStepSize={6}
                  />
                </PopoverContainer>
              </Popover>
            </FormGroup>
            <FormGroup inline={true} label="How many days do you have ?">
              <Popover>
                <Button>{config.days} days</Button>
                <PopoverContainer>
                  <Slider
                    value={config.days}
                    min={3}
                    max={16}
                    onChange={setDays}
                    labelStepSize={3}
                  />
                </PopoverContainer>
              </Popover>
            </FormGroup>
            <FormGroup
              inline={true}
              label={`At what time do you have to wake up ${endWeekday}`}
            >
              <Popover>
                <Button>{displayHour(config.endHour)}</Button>
                <PopoverContainer>
                  <Slider
                    value={config.endHour}
                    min={0}
                    max={23}
                    onChange={setEndHour}
                    labelStepSize={6}
                  />
                </PopoverContainer>
              </Popover>
            </FormGroup>
            <FormGroup inline={true} label="For how long can you sleep ?">
              <Popover>
                <Button>{config.sleepTime} hours</Button>
                <PopoverContainer>
                  <Slider
                    value={config.sleepTime}
                    min={5}
                    max={16}
                    onChange={setSleepTime}
                    labelStepSize={2}
                  />
                </PopoverContainer>
              </Popover>
            </FormGroup>
          </Card>
          {config.endHour > config.startHour && (
            <Card>
              <Callout intent="primary">Are you sure ?</Callout>
            </Card>
          )}
          {dayLength - config.sleepTime > 20 && (
            <Card>
              <Callout intent="primary">
                To succeed you have to stay up more than{" "}
                {Math.floor(dayLength - config.sleepTime)} hours each days
              </Callout>
            </Card>
          )}
          <Card>
            <H4>Here is your planning</H4>
            <p>
              {planning.map((item, index) => (
                <React.Fragment key={index}>
                  Stay up for {item.up.duration} hours <br />
                  Go to bed{" "}
                  <b>
                    {displayWeekday(item.down.day)} at{" "}
                    {displayHour(item.down.hour)}
                  </b>
                  <br />
                  Sleep for {item.down.duration} hours <br />
                  Wake up{" "}
                  <b>
                    {displayWeekday(item.up.day)} at {displayHour(item.up.hour)}
                  </b>
                  <br />
                </React.Fragment>
              ))}
            </p>
          </Card>
        </Column>
      </Columns>
      <Footer>
        Made with <Icon icon="code" iconSize={15} /> by{" "}
        <Link href="https://dldc.dev/twitter">@EtienneTech</Link>
        {" - "}
        Code available on{" "}
        <Link href="https://github.com/etienne-dldc/sleep-cycle-reset">
          <Icon icon="git-repo" iconSize={15} /> Github
        </Link>
      </Footer>
    </Wrapper>
  );
};
