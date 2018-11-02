import * as React from 'react';
import { Wrapper, Column, Columns, PopoverContainer } from './elements';
import { ConnectProps, connect } from '../../logic';
import { Card, Classes, FormGroup, Popover, Button, Slider, MenuItem, H4, Callout } from '@blueprintjs/core';
import padLeft from '../../utils/padLeft';
import { Select, ItemRenderer } from '@blueprintjs/select';
import { Weekday, allWeekdays } from '../../logic/state';

type Props = ConnectProps & {};

const WeekdaySelect = Select.ofType<Weekday>();

const displayWeekday = (day: Weekday) => day.replace(/^(.)(.*)$/, (all, first, rest) => first.toUpperCase() + rest);

const displayHour = (val: number) => `${padLeft(val, 2, '0')}H00`;

const renderWeekday: ItemRenderer<Weekday> = (item, { handleClick, modifiers }) => {
  return <MenuItem active={modifiers.active} key={item} onClick={handleClick} text={displayWeekday(item)} />;
};

class App extends React.PureComponent<Props> {
  public render() {
    const { app } = this.props;
    return (
      <Wrapper className={Classes.DARK}>
        <Columns>
          <Column>
            <Card>
              <FormGroup inline={true} label="What's the day today ?">
                <WeekdaySelect
                  filterable={false}
                  items={allWeekdays}
                  itemRenderer={renderWeekday}
                  onItemSelect={selected => app.actions.setWeekday(selected)}
                >
                  <Button rightIcon="double-caret-vertical">{displayWeekday(app.state.startWeekday)}</Button>
                </WeekdaySelect>
              </FormGroup>
              <FormGroup inline={true} label="At what time did you woke up today ?">
                <Popover>
                  <Button>{displayHour(app.state.startHour)}</Button>
                  <PopoverContainer>
                    <Slider
                      value={app.state.startHour}
                      min={0}
                      max={23}
                      onChange={app.actions.setStartHour}
                      labelStepSize={6}
                    />
                  </PopoverContainer>
                </Popover>
              </FormGroup>
              <FormGroup inline={true} label="How many days do you have ?">
                <Popover>
                  <Button>{app.state.days} days</Button>
                  <PopoverContainer>
                    <Slider value={app.state.days} min={3} max={16} onChange={app.actions.setDays} labelStepSize={3} />
                  </PopoverContainer>
                </Popover>
              </FormGroup>
              <FormGroup inline={true} label={`At what time do you have to wake up ${app.state.endWeekday}`}>
                <Popover>
                  <Button>{displayHour(app.state.endHour)}</Button>
                  <PopoverContainer>
                    <Slider
                      value={app.state.endHour}
                      min={0}
                      max={23}
                      onChange={app.actions.setEndHour}
                      labelStepSize={6}
                    />
                  </PopoverContainer>
                </Popover>
              </FormGroup>
              <FormGroup inline={true} label="For how long can you sleep ?">
                <Popover>
                  <Button>{app.state.sleepTime} hours</Button>
                  <PopoverContainer>
                    <Slider
                      value={app.state.sleepTime}
                      min={5}
                      max={16}
                      onChange={app.actions.setSleepTime}
                      labelStepSize={2}
                    />
                  </PopoverContainer>
                </Popover>
              </FormGroup>
            </Card>
            {app.state.endHour > app.state.startHour && (
              <Card>
                <Callout intent="primary">Are you sure ?</Callout>
              </Card>
            )}
            {app.state.dayLength - app.state.sleepTime > 20 && (
              <Card>
                <Callout intent="primary">
                  To succeed you have to stay up more than {Math.floor(app.state.dayLength - app.state.sleepTime)} hours
                  each days
                </Callout>
              </Card>
            )}
            <Card>
              <H4>Here is your planning</H4>
              <p>
                {app.state.planning.map((item, index) => (
                  <React.Fragment key={index}>
                    Stay up for {item.up.duration} hours <br />
                    Go to bed{' '}
                    <b>
                      {displayWeekday(item.down.day)} at {displayHour(item.down.hour)}
                    </b>
                    <br />
                    Sleep for {item.down.duration} hours <br />
                    Wake up{' '}
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
      </Wrapper>
    );
  }
}

export default connect(App);
