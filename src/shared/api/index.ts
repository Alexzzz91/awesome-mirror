import { Module, provide, createToken } from '@tramvai/core';
import { ENV_MANAGER_TOKEN, ENV_USED_TOKEN } from '@tramvai/module-common';
import {
  HTTP_CLIENT_FACTORY,
  type HttpClient,
} from '@tramvai/module-http-client';

export const WEATHER_HTTP_CLIENT = createToken<HttpClient>(
  'weather HTTP client'
);

@Module({
  providers: [
    provide({
      provide: WEATHER_HTTP_CLIENT,
      // what the useFactory call will return will be written to the DI,
      // and the dependency types will be derived automatically from the deps
      useFactory: ({ factory, envManager }) => {
        return factory({
          name: 'weatherapi',
          // используем базовый урл pokeapi из env переменной
          baseUrl: envManager.get('OPENWEATHER_BASE_URL'),
        });
      },
      // all dependencies from deps will be taken from DI and passed to useFactory
      deps: {
        factory: HTTP_CLIENT_FACTORY,
        envManager: ENV_MANAGER_TOKEN,
      },
    }),
    provide({
      provide: ENV_USED_TOKEN,
      multi: true,
      useValue: [
        {
          key: 'OPENWEATHER_BASE_URL',
          optional: true,
          value: 'http://api.openweathermap.org/data/2.5',
        },
      ],
    }),
  ],
})
export class WeatherApiModule {}
