import { Operation } from 'overmind';
import { Weekday } from './state';

export const setStartHour: Operation.Mutate<number> = ({ state, value }) => {
  state.startHour = value;
};

export const setEndHour: Operation.Mutate<number> = ({ state, value }) => {
  state.endHour = value;
};

export const setDays: Operation.Mutate<number> = ({ state, value }) => {
  state.days = value;
};

export const setWeekday: Operation.Mutate<Weekday> = ({ state, value }) => {
  state.startWeekday = value;
};

export const setSleepTime: Operation.Mutate<number> = ({ state, value }) => {
  state.sleepTime = value;
};
