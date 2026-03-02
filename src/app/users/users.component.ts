import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

    localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
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
