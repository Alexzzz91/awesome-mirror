import { Module } from '@tramvai/core';
import { Weather } from './Weather';

@Module({
  providers: [
    {
      provide: 'Weather',
      useValue: Weather,
    },
  ],
})
export class WeatherModule {}
