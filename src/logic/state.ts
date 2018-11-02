import { Derive } from 'overmind';

/**
 * Parts
 */

export enum Weekday {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
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

/**
 * State
 */

type PlanningItem = { day: Weekday; hour: number; duration: number };

export type State = {
  demo: boolean;
  startHour: number;
  startWeekday: Weekday;
  endHour: number;
  days: number;
  sleepTime: number;
  endWeekday: Derive<Weekday>;
  dayLength: Derive<number>;
  wakeUpDiff: Derive<number>;
  planning: Derive<Array<{ up: PlanningItem; down: PlanningItem }>>;
  totalHours: Derive<number>;
};

const state: State = {
  demo: true,
  startWeekday: Weekday.Thursday,
  startHour: 17,
  endHour: 8,
  days: 4,
  sleepTime: 12,
  endWeekday: state => {
    const startDayIndex = allWeekdays.indexOf(state.startWeekday);
    const endDayIndex = (startDayIndex + state.days) % allWeekdays.length;
    return allWeekdays[endDayIndex];
  },
  wakeUpDiff: state => {
    return state.endHour + 24 - state.startHour;
  },
  totalHours: state => 24 - state.startHour + (state.days - 1) * 24 + state.endHour,
  dayLength: state => state.totalHours / (state.days - 1),
  planning: state => {
    const startDayIndex = allWeekdays.indexOf(state.startWeekday);
    const numOfNights = state.days - 1;
    const extendedDayLength = Math.floor(state.totalHours / numOfNights);
    const longerDays = state.totalHours - extendedDayLength * numOfNights;
    let acc = state.startHour;
    return new Array(numOfNights).fill(null).map((_, index) => {
      const dayLength = extendedDayLength + (index < longerDays ? 1 : 0);
      acc += dayLength;
      const upHour = acc;
      const downHour = upHour - state.sleepTime;
      const upLength = dayLength - state.sleepTime;
      const upDayIndex = (startDayIndex + Math.floor(upHour / 24)) % allWeekdays.length;
      const downDayIndex = (startDayIndex + Math.floor(downHour / 24)) % allWeekdays.length;

      return {
        up: {
          hour: upHour % 24,
          day: allWeekdays[upDayIndex],
          duration: upLength,
        },
        down: {
          hour: downHour % 24,
          day: allWeekdays[downDayIndex],
          duration: state.sleepTime,
        },
      };
    });
  },
};

export default state;
