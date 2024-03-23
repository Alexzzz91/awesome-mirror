import { declareAction, Module, provide } from '@tramvai/core';
import { COMBINE_REDUCERS } from '@tramvai/tokens-common';
import { createReducer, createEvent } from '@tramvai/state';
import { PAGE_SERVICE_TOKEN } from '@tramvai/tokens-router';
import { WEATHER_HTTP_CLIENT } from '~shared/api';
import type { WeatherResponce } from './types';

// momentum.WeatherCtrl = function () {
//     this.apiKey = 'e7238ba6d604e266124dd596dfdf2645';
//     this.apiUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${this.apiKey}`;
//   };

//   momentum.WeatherCtrl.prototype = {
//     // `fetchWeather(cb<Function>)` method
//     // This function should fetch the current weather in Philly by performing an AJAX call. It should pass the given cb (callback) function to the success property of the call.
//     //
//     // hint. look into $.ajax here: http://api.jquery.com/jquery.ajax/
//     // hint. read through the documentation for the OpenWeatherAPI.
//     fetchWeather(lat, lon, cb) {
//       $.ajax({
//         url: `${this.apiUrl}&lat=${lat}&lon=${lon}`,
//         method: 'GET',
//         success: cb,
//       });
//     },
//   };

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
