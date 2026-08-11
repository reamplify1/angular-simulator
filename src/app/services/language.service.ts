import { LocalStorageService } from './local-storage.service';
import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly STORAGE_KEY: string = 'language';
  private readonly DEFAULT_LANGUAGE: string = 'ru';

  getCurrentLanguage(): string | null {
    return this.translateService.getCurrentLang();
  }

  setLanguage(language: string): void {
    this.translateService.use(language);
    this.localStorageService.setItem(this.STORAGE_KEY, language);
  }

  initLanguage(): void {
    const savedLanguage: string | null = this.localStorageService.getItem<string>(this.STORAGE_KEY);
    const language: string = savedLanguage ?? this.DEFAULT_LANGUAGE;

    this.translateService.use(language);
  }

}
