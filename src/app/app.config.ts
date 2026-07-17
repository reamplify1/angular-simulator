import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
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
import { AuthService } from './features/auth/services/auth.service';
import { Observable } from 'rxjs';
import { IAuthUser } from './features/auth/interfaces/IAuthUser';
import { DATE_FORMAT } from './tokens/date-format.token';
import { APP_CONFIG } from './tokens/app-config.token';

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

export function initializeApp(authService: AuthService): () => Observable<IAuthUser | null> {
  return () => authService.initAuth();
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
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    },
    {
      provide: DATE_FORMAT,
      useValue: 'dd.MM.yyyy HH:mm'
    },
    {
      provide: APP_CONFIG,
      useValue: {
        companyName: 'Румтибет',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: true,
        sessionTimeout: 30
      }
    }
  ]
};
