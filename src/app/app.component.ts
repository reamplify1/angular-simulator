import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import type { IAdvantage } from './interfaces/IAdvantage';
import type { ILocation } from './interfaces/ILocation';
import type { IArticle } from './interfaces/IArticle';
import type { INotification } from './interfaces/INotification';
import type { ITour } from './interfaces/ITour';
import { tours } from './data/tours';
import { advantages } from './data/advantages';
import { hikeLocations } from './data/locations';
import { NotificationType } from '../enums/NotificationType';
import { blogArticles } from './data/blog-articles';
import { NotificationService } from './services/message.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  notificationService: NotificationService = inject(NotificationService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  companyName: string = 'Румтибет';
  location: string = '';
  date: string = '';
  participants: string = '';
  liveInputText: string = '';
  dateNow: string = new Date().toLocaleString();
  isDisplayTime: boolean = true;
  clickerCounter: number = 0;
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

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  get iconPath(): string {
    return './images/icons/';
  }

  get imgPath(): string {
    return './images/';
  }

  showNotification(text: string, type: NotificationType) {
    this.notificationService.addNotification(type, text);
  }

  closeNotification(notification: INotification) {
    this.notificationService.removeNotification(notification.id);
  }

  toggleDate(): void {
    this.isDisplayTime = !this.isDisplayTime;
  }

  isFormValid(): boolean {
    return Boolean(this.location && this.date && this.participants);
  }

  increaseCounter(): void {
    this.clickerCounter++;
  }

  decreaseCounter(): void {
    if (this.clickerCounter > 0) {
      this.clickerCounter--;
    }
  }

  updateTimer(): void {
    this.dateNow = new Date().toLocaleString();
  }

  showProgramPrice(): void {
    alert('price is 199$');
  }

  isPrimaryColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  saveLastVisit(): void {
    const LAST_VISIT_KEY: string = 'last-visit';
    const now: Date = new Date();
    this.localStorageService.setItem(LAST_VISIT_KEY, now.toString());
  }

  saveVisitCount(): void {
    const VISIT_COUNT_KEY: string = 'visit-count';
    const visits: string | null = this.localStorageService.getItem(VISIT_COUNT_KEY);

    let count: number = visits ? parseInt(visits) : 0;
    count++;

    this.localStorageService.setItem(VISIT_COUNT_KEY, count.toString());
  }

}
