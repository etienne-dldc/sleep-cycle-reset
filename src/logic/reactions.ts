import { Reaction } from 'overmind';
import { saveConfig } from './actions';

export const saveConfigReaction: Reaction = (reaction, action) => {
  console.log(action);
  return reaction((state: any) => state.config, saveConfig(action));
};
