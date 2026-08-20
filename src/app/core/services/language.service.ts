import { LocalStorageService } from './local-storage.service';
import { inject, Injectable } from '@angular/core';
import { TranslateService, Translation } from '@ngx-translate/core';
import { Language } from '../../../enums/Language';
import { PrimeNG } from 'primeng/config';
import { switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly primeng: PrimeNG = inject(PrimeNG);

  private readonly STORAGE_KEY: string = 'language';
  private readonly DEFAULT_LANGUAGE: Language = Language.RU;
  private readonly SUPPORTED_LANGUAGES: Language[] = Object.values(Language);

  constructor() {
    this.translateService.onLangChange
      .pipe(
        switchMap(() => this.translateService.get('primeng')),
        tap((translations: Translation) => {
          this.primeng.setTranslation(translations);
        }),
      )
      .subscribe();
  }

  getCurrentLanguage(): string | null {
    return this.translateService.getCurrentLang();
  }

  setLanguage(language: string): void {
    this.translateService.use(language);
    this.localStorageService.setItem(this.STORAGE_KEY, language);
  }

  initLanguage(): void {
    const savedLanguage: string | null =
      this.localStorageService.getItem<string>(this.STORAGE_KEY);

    if (savedLanguage) {
      this.translateService.use(savedLanguage);
      return;
    }

    const browserLanguage = this.translateService.getBrowserLang();

    const language: string =
      browserLanguage &&
      this.SUPPORTED_LANGUAGES.includes(browserLanguage as Language)
        ? browserLanguage
        : this.DEFAULT_LANGUAGE;

    this.translateService.use(language);
  }

}
