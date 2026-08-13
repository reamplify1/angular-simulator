import { LocalStorageService } from './local-storage.service';
import { inject, Injectable } from '@angular/core';
import { TranslateService, Translation } from '@ngx-translate/core';
import { Language } from '../../enums/Language';
import { PrimeNG } from 'primeng/config';
import { Observable, tap } from 'rxjs';
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

  getCurrentLanguage(): string | null {
    return this.translateService.getCurrentLang();
  }

  setLanguage(language: Language): void {
    this.translateService.use(language);
    this.setPrimeNgTranslation();

    this.localStorageService.setItem(this.STORAGE_KEY, language);
  }

  initLanguage(): Observable<Translation> {
    const savedLanguage: string | null =
      this.localStorageService.getItem<string>(this.STORAGE_KEY);

    let language: Language;

    if (
      savedLanguage &&
      this.SUPPORTED_LANGUAGES.includes(savedLanguage as Language)
    ) {
      language = savedLanguage as Language;
    } else {
      const browserLanguage: string | undefined =
        this.translateService.getBrowserLang();

      language =
        browserLanguage &&
        this.SUPPORTED_LANGUAGES.includes(browserLanguage as Language)
          ? (browserLanguage as Language)
          : this.DEFAULT_LANGUAGE;
    }

    return this.translateService.use(language).pipe(
      tap(() => this.setPrimeNgTranslation()),
    );
  }

  private setPrimeNgTranslation(): void {
    const translations: Translation = this.translateService.instant('primeng');

    this.primeng.setTranslation(translations);
  }

}
