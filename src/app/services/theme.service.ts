import { Injectable, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { CustomIndigoPreset } from '../presets/indigo-preset';
import { usePreset } from '@primeuix/themes';
import { AppTheme } from '../../enums/AppTheme';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private primeNg: PrimeNG = inject(PrimeNG);
  private localStorageService: LocalStorageService = inject(LocalStorageService)
  private STORAGE_KEY = 'app-theme';

  private themeSubject: BehaviorSubject<AppTheme> = new BehaviorSubject<AppTheme>(AppTheme.AURA);
  theme$: Observable<AppTheme> = this.themeSubject.asObservable();

  private darkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor() {
    this.initTheme();
    this.initDarkMode();
  }

  private initTheme(): void {
    const saved: AppTheme | null = this.localStorageService.getItem<AppTheme>(this.STORAGE_KEY);
    const theme: AppTheme = saved ?? AppTheme.AURA;

    this.applyTheme(theme);
    this.themeSubject.next(theme);
  }

  private initDarkMode(): void {
    const isDark: boolean = this.localStorageService.getItem<boolean>('dark-mode') ?? false;

    this.darkModeSubject.next(isDark);

    document.documentElement.classList.toggle('my-app-dark', isDark);
  }

  setTheme(theme: AppTheme): void {
    this.applyTheme(theme);
    this.themeSubject.next(theme);
    this.localStorageService.setItem(this.STORAGE_KEY, theme);
  }


  applyTheme(theme: AppTheme): void {
    switch (theme) {
      case AppTheme.AURA:
      usePreset(Aura);
      break;

      case AppTheme.LARA:
      usePreset(Lara);
      break;

      case AppTheme.NORA:
      usePreset(Nora);
      break;

      case AppTheme.CUSTOM:
      usePreset(CustomIndigoPreset);
      break;
    }
  }

  getTheme(): AppTheme {
    return this.themeSubject.getValue();
  }

  toggleDarkMode(isDark: boolean): void {
    document.documentElement.classList.toggle('my-app-dark', isDark);
    this.darkModeSubject.next(isDark);
    this.localStorageService.setItem('dark-mode', isDark);
  }

}

