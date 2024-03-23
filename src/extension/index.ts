import { createApp } from '@tramvai/core';
import { CommonModule } from '@tramvai/module-common';
import { SpaRouterModule } from '@tramvai/module-router';
import { RenderModule } from '@tramvai/module-render';
import { ServerModule } from '@tramvai/module-server';
import { ErrorInterceptorModule } from '@tramvai/module-error-interceptor';
import { RequestLimiterModule } from '@tramvai/module-request-limiter';
import { HttpClientModule } from '@tramvai/module-http-client';
import {
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot,
} from '@tramvai/tokens-render';
import { PageRenderModeModule } from '@tramvai/module-page-render-mode';
import { HeaderModule } from '~shared/header';

import './app.module.css';
import { WeatherApiModule } from '~shared/api';
import { WeatherModule } from '~shared/weather';
import { ConfigModule } from '~entities/config';

createApp({
  name: 'awesome-mirror-extension',
  modules: [
    CommonModule,
    SpaRouterModule,
    RenderModule.forRoot({ useStrictMode: true }),
    ErrorInterceptorModule,
    HeaderModule,
    ServerModule,
    HttpClientModule,
    PageRenderModeModule,
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
    {
      provide: RENDER_SLOTS,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.BODY_START,
        payload: '<div class="application bg-wrapper">',
      },
    },
    {
      provide: RENDER_SLOTS,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.BODY_END,
        payload: '</div>',
      },
    },
  ],
});
