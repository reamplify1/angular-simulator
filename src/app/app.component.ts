import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { IAdvantage } from './interfaces/IAdvantage';
import { advantages } from './data/advantages';
import { ILocation } from './interfaces/ILocation';
import { hikeLocations } from './data/locations';
import { Status } from './data/status';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'Румтибет';
  location: string = '';
  date: string = '';
  participants: string = '';
  liveInputText = '';
  dateNow: string = new Date().toLocaleString();
  isDisplayTime: boolean = true;
  clickerCounter: number = 0;
  isLoading: boolean = true;
  advantages: IAdvantage[] = advantages;
  hikeLocations: ILocation[] = hikeLocations;
  readonly iconPath: string = './images/svg/';
  isNotified: boolean = false;
  readonly statusMessage: typeof Status = Status;
  // currentStatus!: Status;
  currentStatus?: keyof typeof Status;
  message = '';
  // readonly success: Status = Status.Success;
  // readonly info: Status = Status.Info;
  // readonly warn: Status = Status.Warn;
  // readonly Error: Status = Status.Error;


  numberCollection: Collection <number> = new Collection <number> ([1, 2, 3, 4, 5]);
  stringCollection: Collection <string> = new Collection <string> (['Boston', 'London', 'Винница']);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();

    // setTimeout(() => {
    //   this.isNotified = true;
    // }, 5000);


    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    setInterval(() => {
      this.updateTimer();
      }, 1000);
    }

    showNotification(key: keyof typeof Status) {

      this.currentStatus = key;
      this.message = this.statusMessage[key];
      this.isNotified = true;

      setTimeout(() => {
        this.isNotified = false;
      }, 3000);
    }

    closeNotification() {
      this.isNotified = false;
    }

    toggleDate():void {
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
      localStorage.setItem(LAST_VISIT_KEY, now.toString());
    }

    saveVisitCount(): void {
      const VISIT_COUNT_KEY: string = 'visit-count';
      const visits: string | null = localStorage.getItem(VISIT_COUNT_KEY);

      let count: number = visits ? parseInt(visits) : 0;
      count++;

      localStorage.setItem(VISIT_COUNT_KEY, count.toString());
    }

}
