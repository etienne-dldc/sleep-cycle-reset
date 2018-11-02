import { Reaction } from 'overmind';
import { saveConfig } from './actions';

export const saveConfigReaction: Reaction = (reaction, action) =>
  reaction((state: any) => state.config, saveConfig(action));
