import { Module } from '@tramvai/core';
import { Focus } from './Focus';

@Module({
  providers: [
    {
      provide: 'Focus',
      useValue: Focus,
    },
  ],
})
export class FocusModule {}
