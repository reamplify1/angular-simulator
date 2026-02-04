import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAdvantage } from './models/advantage.model';
import { advantagesData } from './data/advantages.data';
import { ILocation } from './models/location.model';
import { locationsToHike } from './data/location.data';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'Румтибет';
  location: string = '';
  date: string = '';
  participants: string = '';
  liveInputText = '';
  dateNow: Date = new Date();
  displayTime: boolean = true;
  clickerCounter: number = 0;
  isLoading: boolean = true;
  advantages: IAdvantage[] = advantagesData;
  locationsToHike: ILocation[] = locationsToHike

  numberCollection: Collection < number > = new Collection < number > ([1, 2, 3, 4, 5]);
  stringCollection: Collection < string > = new Collection < string > (['Boston', 'London', 'Винница']);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();

    setTimeout(() => {
      this.isLoading = false;
    }, 2000)

    setInterval(() => {
      this.dateNow = new Date();
    }, 1000);
    }

    toggleDateOrClick():void {
      this.displayTime = !this.displayTime
    }

    isDisabledBtn(): boolean {
      return !this.location || !this.date || !this.participants
    }

    increaseCounter(): void {
      this.clickerCounter++;
    }

    decreaseCounter(): void {
      if (this.clickerCounter > 0) {
        this.clickerCounter--;
      }
    }

    onPriceProgram() {
      console.log('price is 199$');
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
