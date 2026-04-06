import { Component, inject } from '@angular/core';
import { Color } from '../../enums/Color';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import type { IAdvantage } from '../interfaces/IAdvantage';
import type { ILocation } from '../interfaces/ILocation';
import type { IArticle } from '../interfaces/IArticle';
import type { ITour } from '../interfaces/ITour';
import { tours } from '../data/tours';
import { advantages } from '../data/advantages';
import { hikeLocations } from '.././data/locations';
import { NotificationType } from '../../enums/NotificationType';
import { blogArticles } from '.././data/blog-articles';
import { NotificationService } from '../services/notification.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
})
export class HomePageComponent {

  notificationService: NotificationService = inject(NotificationService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  location: string = '';
  date: string = '';
  participants: string = '';
  liveInputText: string = '';
  isLoading: boolean = true;
  advantages: IAdvantage[] = advantages;
  hikeLocations: ILocation[] = hikeLocations;
  isNotified: boolean = false;
  message: string = '';
  articles: IArticle[] = blogArticles;
  notificationType: typeof NotificationType = NotificationType;
  tours: ITour[] = tours;

  numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  stringCollection: Collection<string> = new Collection<string>(['Boston', 'London', 'Винница']);

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
    alert('price is 199$');
  }

  isPrimaryColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

}
