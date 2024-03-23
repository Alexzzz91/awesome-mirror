import { createReducer, createEvent } from '@tramvai/state';
import { Module, provide } from '@tramvai/core';
import { COMBINE_REDUCERS } from '@tramvai/tokens-common';

export const pushLineEvent = createEvent<string>('setWeatheApiKey');

interface State {
  weatheApiKey: string;
  weatheApiUrl: string;
}

export const ConfigStore = createReducer('setWeatheApiKey', {
  weatheApiKey: 'e7238ba6d604e266124dd596dfdf2645',
} as State).on(pushLineEvent, (state, weatheApiKey) => {
  console.log('weatheApiKey', weatheApiKey);

  return {
    ...state,
    weatheApiKey,
  };
});

@Module({
  providers: [
    // register reducer in the application
    provide({
      provide: COMBINE_REDUCERS,
      multi: true,
      // highlight-next-line
      useValue: ConfigStore,
    }),
  ],
})

// highlight-next-line
export class ConfigModule {}
