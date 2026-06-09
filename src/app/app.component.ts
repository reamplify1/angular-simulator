import { Component, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NotificationComponent } from "./notification/notification.component";
import { LocalStorageService } from './services/local-storage.service';
import { LoaderComponent } from "./loader/loader.component";
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent, LoaderComponent],
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

    this.router.events.subscribe(event => {

    if (event instanceof NavigationStart) {
      this.loader.showLoader();
    }

    if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.loader.hideLoader();
    }

  });
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
