import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, tap, of, delay } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private notificationService = inject(NotificationService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.userApiService.getUsers().pipe(
      catchError(error => {
        this.notificationService.showError('Ошибка загрузки пользователей');
        console.error('Ошибка загрузки пользователей', error);
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

}
