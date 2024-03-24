import { createReducer, createEvent } from '@tramvai/state';
import { Module, provide } from '@tramvai/core';
import { COMBINE_REDUCERS } from '@tramvai/tokens-common';
import { commandLineListTokens } from '@tramvai/core';
import { STORE_TOKEN } from '@tramvai/tokens-common';
import type { ConfigState } from './types';

export const pushWeatheApiKeyEvent = createEvent<string>('setWeatheApiKey');
export const pushUserNameEvent = createEvent<string>('setUserName');

const clientSideLoadEvent = createEvent('clientSideLoading', () => {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('configStore') || '');
    } catch (error) {
      return {};
    }
  }

  return {};
});

export const ConfigStore = createReducer('setWeatheApiKey', {
  weatheApiKey: 'e7238ba6d604e266124dd596dfdf2645',
  userName: '',
} as ConfigState)
  .on(pushWeatheApiKeyEvent, (state, weatheApiKey) => {
    console.log('weatheApiKey', weatheApiKey);

    return {
      ...state,
      weatheApiKey,
    };
  })
  .on(pushUserNameEvent, (state, userName) => {
    console.log('userName', userName);

    return {
      ...state,
      userName,
    };
  })
  .on(clientSideLoadEvent, (state, localStorageState) => {
    console.log('localStorageState', localStorageState);

    return {
      ...state,
      ...localStorageState,
    };
  });

const provider = {
  provide: commandLineListTokens.resolveUserDeps,
  useFactory: ({ store }) => {
    console.log('store', store.dispatch(clientSideLoadEvent()));

    return function readCounterState() {
      if (typeof window !== 'undefined') {
        store.subscribe(() => {
          const configStore = store.getState(ConfigStore);

          localStorage.setItem('configStore', JSON.stringify(configStore));
        });
      }
    };
  },
  deps: {
    store: STORE_TOKEN,
  },
};

@Module({
  providers: [
    // register reducer in the application
    provide({
      provide: COMBINE_REDUCERS,
      multi: true,
      // highlight-next-line
      useValue: ConfigStore,
    }),
    provider,
  ],
})

// highlight-next-line
export class ConfigModule {}

console.log('clientSideLoadEvent', clientSideLoadEvent());
