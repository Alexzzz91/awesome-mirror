import { Module, provide } from '@tramvai/core';
import { DEFAULT_HEADER_COMPONENT } from '@tramvai/tokens-render';
import { ROUTER_GUARD_TOKEN } from '@tramvai/tokens-router';
import { Header } from './Header';

const provider = provide({
  provide: ROUTER_GUARD_TOKEN,
  useValue: async (routeProps) => {
    console.log('routeProps', routeProps);
  },
});

@Module({
  providers: [
    {
      provide: DEFAULT_HEADER_COMPONENT,
      useValue: Header,
    },
    provider,
  ],
})
export class HeaderModule {}
