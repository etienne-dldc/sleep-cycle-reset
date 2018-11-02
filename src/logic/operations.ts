import { Operation } from 'overmind';
import { Config } from './state';

export const saveConfigInStore: Operation.Run = ({ save, state }) => {
  save(state.config);
};

export const restoreFromStore: Operation.Map<void, Config | undefined> = ({ restore }) => {
  return restore();
};
