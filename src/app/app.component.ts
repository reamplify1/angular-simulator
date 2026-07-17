import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { LocalStorageService } from './services/local-storage.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  localStorageService: LocalStorageService = inject(LocalStorageService);

  private router: Router = inject(Router);
  private loader: LoaderService = inject(LoaderService);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  saveLastVisit(): void {
    const LAST_VISIT_KEY = 'last-visit';
    const now: Date = new Date();
    this.localStorageService.setItem(LAST_VISIT_KEY, now.toString());
  }

  saveVisitCount(): void {
    const VISIT_COUNT_KEY = 'visit-count';
    const visits: string | null = this.localStorageService.getItem(VISIT_COUNT_KEY);

    let count: number = visits ? parseInt(visits) : 0;
    count++;

    this.localStorageService.setItem(VISIT_COUNT_KEY, count.toString());
  }
}
