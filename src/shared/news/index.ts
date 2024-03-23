import { Module } from '@tramvai/core';
import { News } from './News';

@Module({
  providers: [
    {
      provide: 'News',
      useValue: News,
    },
  ],
})
export class NewsModule {}
