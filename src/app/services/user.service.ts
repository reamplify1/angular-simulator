import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private notificationService: NotificationService = inject(NotificationService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private LOCAL_STORAGE_KEY: string = 'users';

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem(this.LOCAL_STORAGE_KEY, users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  addUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...currentUsers, user];
    this.setUsers(updatedUsers);
  }

  deleteUser(id: number): void {
    const users: IUser[] = this.getUsers().filter(user => user.id !== id);
    this.setUsers(users);
  }

  loadUsers(forceUpdate: boolean = false): Observable<IUser[]> {
    const storageUsers: IUser[] | null = this.localStorageService.getItem(this.LOCAL_STORAGE_KEY);

    if (storageUsers?.length && !forceUpdate) {
      return of(storageUsers);
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
