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
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AppTheme } from '../../enums/AppTheme';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, AsyncPipe ,RouterLinkActive, ThemeComponent, DarkModeToggleComponent, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  notificationService: NotificationService = inject(NotificationService);

  isDarkMode$: Observable<boolean> = this.themeService.isDarkMode$;
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  companyName: string = 'Румтибет';
  dateNow: string = new Date().toLocaleString();
  isDisplayTime: boolean = true;
  clickerCounter: number = 0;

  ngOnInit(): void {
    const theme: AppTheme = this.themeService.getTheme();
    this.themeService.setTheme(theme);
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
  ];

}
