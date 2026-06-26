import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { customIndigoPreset } from './presets/indigo-preset';
import { Preset } from '@primeuix/themes/types';
import { AppTheme } from '../enums/AppTheme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { authInterceptor } from './features/auth/auth.interceptor';

function getInitialTheme(): Preset {
  const savedTheme: AppTheme | null = localStorage.getItem('app-theme') as AppTheme | null;

  switch (savedTheme) {
    case AppTheme.LARA:
      return Lara;

    case AppTheme.NORA:
      return Nora;

    case AppTheme.CUSTOM:
      return customIndigoPreset;

    default:
      return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([loggingInterceptor, errorInterceptor, authInterceptor])),

    providePrimeNG({
      theme: {
        preset: getInitialTheme(),
        options: {
          darkModeSelector: '.my-app-dark'
        },
      }
    })
  ]
};
