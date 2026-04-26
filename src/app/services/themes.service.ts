import { Injectable, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { CustomIndigoPreset } from '../presets/indigo-preset';
import { usePreset } from '@primeuix/themes';
import { AppTheme } from '../types/AppTheme';

@Injectable({ providedIn: 'root' })
export class ThemesService {

  private primeNg: PrimeNG = inject(PrimeNG);
  theme = 'aura'
  themeColorDay: boolean = true;

  toggleDarkMode(isDark: boolean) {
    const element: HTMLElement | null = document.querySelector('html');
    element?.classList.toggle('my-app-dark', isDark);
    this.themeColorDay = !this.themeColorDay;
  }

  setTheme(theme: AppTheme) {
    switch (theme) {
      case 'aura':
        usePreset(Aura);
        break;
      case 'lara':
        usePreset(Lara);
        break;
      case 'nora':
        usePreset(Nora);
        break;
      case 'custom':
        usePreset(CustomIndigoPreset)
        break;
    }
  }

}

