import { Action } from 'overmind';
import * as mutations from './mutations';
import * as operations from './operations';
import actionsFromMutations from '../utils/actionsFromMutations';

// Actions from mutations

export const { setDays, setEndHour, setStartHour, setWeekday, setSleepTime } = actionsFromMutations(mutations);
