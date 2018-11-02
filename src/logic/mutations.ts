import { Operation } from 'overmind';
import { Weekday, Config } from './state';

export const setConfig: Operation.Mutate<Config> = ({ state, value }) => {
  state.config = value;
};

export const setStartHour: Operation.Mutate<number> = ({ state, value }) => {
  state.config.startHour = value;
};

export const setEndHour: Operation.Mutate<number> = ({ state, value }) => {
  state.config.endHour = value;
};

export const setDays: Operation.Mutate<number> = ({ state, value }) => {
  state.config.days = value;
};

export const setWeekday: Operation.Mutate<Weekday> = ({ state, value }) => {
  state.config.startWeekday = value;
};

export const setSleepTime: Operation.Mutate<number> = ({ state, value }) => {
  state.config.sleepTime = value;
};
