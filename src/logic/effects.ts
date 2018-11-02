import store from 'store';
import { Config } from './state';

export const restore = (): Config | undefined => {
  return store.get('config');
};

export const save = (config: Config) => {
  store.set('config', config);
};
