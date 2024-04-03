import { Module, provide } from '@tramvai/core';
import { ENV_USED_TOKEN } from '@tramvai/module-common';

@Module({
  providers: [
    provide({
      provide: ENV_USED_TOKEN,
      useValue: [{ key: 'PROJECT', value: 'ext' }],
      multi: true,
    }),
  ],
})
export class SetEnvExtension {}
