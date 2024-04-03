import { declareAction, Module, provide } from '@tramvai/core';
import { COMBINE_REDUCERS } from '@tramvai/tokens-common';
import { createReducer, createEvent } from '@tramvai/state';
import { PAGE_SERVICE_TOKEN } from '@tramvai/tokens-router';
import { WEATHER_HTTP_CLIENT } from '~shared/api';
import type { WeatherResponce } from './types';

export const setWeatherEvent = createEvent<WeatherResponce>('fetch weather');

export const fetchWeatherAction = declareAction({
  name: 'fetchWeather',
  async fn({ apiKey, lat, lon }) {
    if (!apiKey || !lat || !lat) {
      return;
    }

    const weatherResponse =
      await this.deps.pokeapiHttpClient.get<WeatherResponce>(
        `weather?APPID=${apiKey}&lat=${lat}&lon=${lon}`
      );

    // save information about the pokemon in the store
    this.dispatch(setWeatherEvent(weatherResponse.payload));
  },
  deps: {
    pokeapiHttpClient: WEATHER_HTTP_CLIENT,
    pageService: PAGE_SERVICE_TOKEN,
  },
  conditions: {
    // disable caching of the action, since it must be executed again for different name values
    dynamic: true,
  },
});

export const WeatherStore = createReducer(
  'fetch weather',
  {} as WeatherResponce
).on(setWeatherEvent, (state, newState) => {
  return {
    ...state,
    ...newState,
  };
});

@Module({
  providers: [
    // register reducer in the application
    provide({
      provide: COMBINE_REDUCERS,
      multi: true,
      // highlight-next-line
      useValue: WeatherStore,
    }),
  ],
})

// highlight-next-line
export class PokemonModule {}
