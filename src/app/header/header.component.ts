import { LocalStorageService } from './../services/local-storage.service';
import { NotificationService } from './../services/notification.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { INavigation } from '../interfaces/INavigation';
import { DarkModeToggleComponent } from '../toggle-theme-color.component/dark-mode-toggle';
import { faSun, faMoon ,IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeComponent } from '../theme-switcher/theme.component';
import { ThemeService } from '../services/theme.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AppTheme } from '../../enums/AppTheme';
import { AuthService } from '../features/auth/services/auth.service';
import { DATE_FORMAT } from '../tokens/date-format.token';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppConfig';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, AsyncPipe, DatePipe ,RouterLinkActive, ThemeComponent, DarkModeToggleComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  notificationService: NotificationService = inject(NotificationService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private authService: AuthService = inject(AuthService);
  readonly dateFormat: string = inject(DATE_FORMAT);
  readonly lastLogin: Date | null = this.getLastLoginDate();
  readonly appConfig: IAppConfig = inject(APP_CONFIG);

  readonly companyName: string = this.appConfig.companyName;
  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  dateNow: string = new Date().toLocaleString();
  isDisplayTime: boolean = true;
  clickerCounter: number = 0;

  isLogged$: Observable<boolean> = this.authService.isAuthenticated$;

  ngOnInit(): void {
    const theme: AppTheme = this.themeService.getTheme();
    this.themeService.setTheme(theme);
  }

  private getLastLoginDate(): Date | null {
    const date: string | null = this.localStorageService.getItem<string>('last-login');
    const result: Date | null = date ? new Date(date) : null;
    return result;
  }

  onLogout(): void {
    this.authService.logout();
  }

  toggleDate(): void {
    this.isDisplayTime = !this.isDisplayTime;
  }

  increaseCounter(): void {
    this.clickerCounter++;
  }

  decreaseCounter(): void {
    if (this.clickerCounter > 0) {
      this.clickerCounter--;
    }
  }

  navigation: INavigation[] = [
    { id: 'main-page', label: 'Главная' , link: ''},
    { id: 'guide-page', label: 'Пользователи', link: 'users' },
    { id: 'posts-page', label: 'Посты', link: 'posts' },
  ];

}
