import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { CustomIndigoPreset } from './presets/indigo-preset';
import { Preset } from '@primeuix/themes/types';
import { AppTheme } from '../enums/AppTheme';

function getInitialTheme(): Preset {
  const savedTheme: string | null = localStorage.getItem('app-theme');

  switch (savedTheme) {
    case AppTheme.LARA:
      return Lara;

    case AppTheme.NORA:
      return Nora;

    case AppTheme.CUSTOM:
      return CustomIndigoPreset;

    default:
      return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),

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
