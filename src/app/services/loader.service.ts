import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoader(): void {
    document.body.style.overflow = 'hidden';
    this.loadingSubject.next(true);
  }

  hideLoader(): void {
    document.body.style.overflow = '';
    this.loadingSubject.next(false);
  }

}
