import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { Collection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  
  companyName: string = 'Румтибет';

  numberCollection: Collection<number> = new Collection<number>([1, 2, 3, 4, 5]);
  stringCollection: Collection<string> = new Collection<string>(['Boston', 'London', 'Винница']);

  constructor() {
    this.saveLastVisit();
    this.saveNumberOfVisits();
  }

  isMainColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  saveLastVisit(): void {
    const now = new Date();
    localStorage.setItem('last-visit', now.toString());
  }

  saveNumberOfVisits(): void {
    const visits = localStorage.getItem('number-of-visits');

    let count = visits ? parseInt(visits) : 0;
    count++;
    localStorage.setItem('number-of-visits', count.toString());
  }
}
