import { Action } from 'overmind';
import * as mutations from './mutations';
import * as operations from './operations';
import actionsFromMutations from '../utils/actionsFromMutations';
import { Config } from './state';

export const saveConfig: Action = ({ debounce }) => debounce(500).run(operations.saveConfigInStore);

export const restoreConfig: Action = ({ map }) =>
  map(operations.restoreFromStore)
    .filter(({ value }) => value !== undefined && value !== null)
    .map(({ value }) => value as Config)
    .mutate(mutations.setConfig);

// Actions from mutations

export const { setDays, setEndHour, setStartHour, setWeekday, setSleepTime } = actionsFromMutations(mutations);
