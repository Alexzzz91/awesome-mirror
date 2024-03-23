import { Module } from '@tramvai/core';
import { Clock } from './Clock';

@Module({
  providers: [
    {
      provide: 'Clock',
      useValue: Clock,
    },
  ],
})
export class ClockModule {}
