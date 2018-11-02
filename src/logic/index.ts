import { TConnect, createConnect } from 'overmind-react';
import { Overmind, TApp } from 'overmind';
import * as effects from './effects';
import * as actions from './actions';
import * as reactions from './reactions';
import state from './state';

type Config = {
  state: typeof state;
  actions: typeof actions;
  reactions: typeof reactions;
  effects: typeof effects;
  onInitialize: any;
};

const config: Config = {
  actions,
  state,
  effects,
  reactions,
  onInitialize: actions.restoreConfig,
};

declare module 'overmind' {
  interface App extends TApp<typeof config> {}
}

const app = new Overmind(config);

export type ConnectProps = TConnect<typeof app>;

export const connect = createConnect(app);

export default app;
