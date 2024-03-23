import {
  commandLineListTokens,
  createApp,
  optional,
  provide,
} from '@tramvai/core';
import { CommonModule } from '@tramvai/module-common';
import { SpaRouterModule } from '@tramvai/module-router';
import { RenderModule } from '@tramvai/module-render';
import { ServerModule } from '@tramvai/module-server';
import { ErrorInterceptorModule } from '@tramvai/module-error-interceptor';
import { HttpClientModule } from '@tramvai/module-http-client';
import { RequestLimiterModule } from '@tramvai/module-request-limiter';
import { SeoModule } from '@tramvai/module-seo';
import {
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot,
} from '@tramvai/tokens-render';
import { PageRenderModeModule } from '@tramvai/module-page-render-mode';
import {
  PWA_WORKBOX_TOKEN,
  TramvaiPwaModule,
} from '@tramvai/module-progressive-web-app';
import { HeaderModule } from '~shared/header';

import './app.module.css';
import { WeatherApiModule } from '~shared/api';
import { ConfigModule } from '~entities/config';
import { WeatherModule } from '~shared/weather';

createApp({
  name: 'awesome-mirror-pwa',
  modules: [
    CommonModule,
    SpaRouterModule,
    RenderModule.forRoot({ useStrictMode: true }),
    SeoModule,
    ServerModule,
    ErrorInterceptorModule,
    HeaderModule,
    PageRenderModeModule,
    TramvaiPwaModule,
    HttpClientModule,
    RequestLimiterModule,
    WeatherApiModule,
    WeatherModule,
    ConfigModule,
  ],
  providers: [
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.HEAD_META,
        payload:
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
    },
    ...(typeof window !== undefined
      ? [
          provide({
            provide: commandLineListTokens.listen,
            useFactory: ({ workbox }) => {
              return async function sendMessageToSW() {
                const wb = await workbox?.();

                // wb can be `null` if Service Worker is not supported or registration failed
                const swVersion = await wb?.messageSW({ type: 'GET_VERSION' });

                console.log('Service Worker version:', swVersion);
              };
            },
            deps: {
              workbox: optional(PWA_WORKBOX_TOKEN),
            },
          }),
        ]
      : []),
  ],
});
