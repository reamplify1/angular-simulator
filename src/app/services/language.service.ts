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
  private readonly SUPPORTED_LANGUAGES: string[] = ['ru', 'en', 'kk'];

  getCurrentLanguage(): string | null {
    return this.translateService.getCurrentLang();
  }

  setLanguage(language: string): void {
    this.translateService.use(language);
    this.localStorageService.setItem(this.STORAGE_KEY, language);
  }

  initLanguage(): void {
    const savedLanguage: string | null = this.localStorageService.getItem<string>(this.STORAGE_KEY);

    if (savedLanguage && this.SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      this.translateService.use(savedLanguage);
      return;
    }

    const browserLanguage: string | undefined = this.translateService.getBrowserLang();

    const language: string =
      browserLanguage && this.SUPPORTED_LANGUAGES.includes(browserLanguage)
        ? browserLanguage
        : this.DEFAULT_LANGUAGE;

    this.translateService.use(language);
  }

}
