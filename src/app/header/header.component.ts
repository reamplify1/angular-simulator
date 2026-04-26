import { NotificationService } from './../services/notification.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { INavigation } from '../interfaces/INavigation';
import { ToggleSwitchDisabledDemo } from '../toggle-switch/toggle-switch-disabled-demo';
import { faSun, faMoon ,IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectbuttonMultipleDemo } from '../select-buttons/select-buttons.component';
import { ThemesService } from '../services/themes.service';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive, SelectbuttonMultipleDemo ,ToggleSwitchDisabledDemo, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {

  themeService: ThemesService = inject(ThemesService);
  notificationService: NotificationService = inject(NotificationService);

  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;
  companyName: string = 'Румтибет';
  dateNow: string = new Date().toLocaleString();
  isDisplayTime: boolean = true;
  clickerCounter: number = 0;

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
