import { Component, inject } from '@angular/core';
import { Color } from '../../../enums/Color';
import { Collection } from '../../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import type { IAdvantage } from '../../interfaces/IAdvantage';
import type { ILocation } from '../../interfaces/ILocation';
import type { IArticle } from '../../interfaces/IArticle';
import type { ITour } from '../../interfaces/ITour';
import { tours } from '../../data/tours';
import { advantages } from '../../data/advantages';
import { hikeLocations } from '../../data/locations';
import { NotificationType } from '../../../enums/NotificationType';
import { blogArticles } from '../../data/blog-articles';
import { NotificationService } from '../../core/services/notification.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import {
  faPlay,
  IconDefinition,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, CommonModule, FontAwesomeModule, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
})
export class HomePageComponent {

  notificationService: NotificationService = inject(NotificationService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly translateService: TranslateService =
    inject(TranslateService);

  faPlay: IconDefinition = faPlay;
  faChevronDown: IconDefinition = faChevronDown;

  location = '';
  date = '';
  participants = '';
  liveInputText = '';
  isLoading = true;
  advantages: IAdvantage[] = advantages;
  hikeLocations: ILocation[] = hikeLocations;
  isNotified = false;
  message = '';
  articles: IArticle[] = blogArticles;
  notificationType: typeof NotificationType = NotificationType;
  tours: ITour[] = tours;

  numberCollection: Collection<number> = new Collection<number>([
    1, 2, 3, 4, 5,
  ]);

  stringCollection: Collection<string> = new Collection<string>(['Boston', 'London', 'Винница',]);

  get iconPath(): string {
    return './images/icons/';
  }

  get imgPath(): string {
    return './images/';
  }

  isFormValid(): boolean {
    return Boolean(this.location && this.date && this.participants);
  }

  showProgramPrice(): void {
    const message: string = this.translateService.instant(
      'home-page.programPrice',
    );
    alert(message);
  }

  isPrimaryColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  showSuccessMessage(): void {
    const message = this.translateService.instant('home-page.successMessage');
    this.notificationService.showSuccess(message);
  }

  showInfoMessage(): void {
    const message: string = this.translateService.instant(
      'home-page.aboutTour.infoMessage',
    );
    this.notificationService.showInfo(message);
  }

  showRating(): void {
    const message: string = this.translateService.instant(
      'home-page.popularTours.rating',
    );

    this.notificationService.showInfo(message);
  }

  showOtherMaterials(): void {
    const message: string = this.translateService.instant(
      'home-page.blog.otherMaterialsMessage',
    );

    this.notificationService.showWarn(message);
  }

}
