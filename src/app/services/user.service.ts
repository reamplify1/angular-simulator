import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, tap, of, delay } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private notificationService: NotificationService = inject(NotificationService);
  private LOCAL_STORAGE_KEY: string = 'users';

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(users));
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  addUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...currentUsers, user];
    this.setUsers(updatedUsers);
  }

  loadUsers(forceUpdate: boolean = false): Observable<IUser[]> {
    const cachedData: string | null = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (cachedData && !forceUpdate) {
      const users = JSON.parse(cachedData);
      this.usersSubject.next(users);
      return of(users);
    }

    this.loaderService.showLoader();

    return this.userApiService.getUsers()
      .pipe(
        catchError((error: HttpErrorResponse) => {
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
