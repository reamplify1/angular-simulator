import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { customIndigoPreset } from './core/presets/indigo-preset';
import { Preset } from '@primeuix/themes/types';
import { AppTheme } from '../enums/AppTheme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { authInterceptor } from './core/auth/auth.interceptor';
import { AuthService } from './core/auth/auth.service';
import { Observable } from 'rxjs';
import { IAuthUser } from './core/interfaces/IAuthUser';
import { DATE_FORMAT } from './core/tokens/date-format.token';
import { APP_CONFIG } from './core/tokens/app-config.token';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './core/services/language.service';

function getInitialTheme(): Preset {
  const savedTheme: AppTheme | null = localStorage.getItem(
    'app-theme',
  ) as AppTheme | null;

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

export function initializeApp(
  authService: AuthService,
  languageService: LanguageService,
): () => Observable<IAuthUser | null> {
  return () => {
    languageService.initLanguage();
    return authService.initAuth();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(
      withInterceptors([loggingInterceptor, errorInterceptor, authInterceptor]),
    ),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
    }),

    providePrimeNG({
      theme: {
        preset: getInitialTheme(),
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, LanguageService],
      multi: true,
    },
    {
      provide: DATE_FORMAT,
      useValue: 'dd.MM.yyyy HH:mm',
    },
    {
      provide: APP_CONFIG,
      useValue: {
        companyName: 'Румтибет',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: true,
        sessionTimeout: 30,
      },
    },
  ],
};
