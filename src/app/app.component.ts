import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, pairwise } from 'rxjs';
import { NotificationComponent } from './core/notification/notification.component';
import { LocalStorageService } from './core/services/local-storage.service';
import { LoaderComponent } from './core/loader/loader.component';
import { LoaderService } from './core/services/loader.service';

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
  private viewportScroller: ViewportScroller = inject(ViewportScroller);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
    this.scrollToTopOnPageChange();
  }

  saveLastVisit(): void {
    const LAST_VISIT_KEY = 'last-visit';
    const now: Date = new Date();
    this.localStorageService.setItem(LAST_VISIT_KEY, now.toString());
  }

  saveVisitCount(): void {
    const VISIT_COUNT_KEY = 'visit-count';
    const visits: string | null =
      this.localStorageService.getItem(VISIT_COUNT_KEY);

    let count: number = visits ? parseInt(visits) : 0;
    count++;

    this.localStorageService.setItem(VISIT_COUNT_KEY, count.toString());
  }

  scrollToTopOnPageChange(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects.split(/[?#]/)[0]),
        pairwise(),
        filter(([previousPath, currentPath]: [string, string]) => previousPath !== currentPath),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.viewportScroller.scrollToPosition([0, 0]));
  }

}
