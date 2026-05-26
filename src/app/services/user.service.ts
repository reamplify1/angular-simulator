import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, of, tap } from 'rxjs';
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

  private readonly userApiService: UserApiService = inject(UserApiService);
  private readonly loaderService: LoaderService = inject(LoaderService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly LOCAL_STORAGE_KEY: string = 'users';

  private readonly usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
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
    const users: IUser[] = this.getUsers().filter((user: IUser) => user.id !== id);
    this.setUsers(users);
  }

  loadUsers(forceUpdate: boolean = false): Observable<IUser[]> {
    const storageUsers: IUser[] | null = this.localStorageService.getItem<IUser[]>(this.LOCAL_STORAGE_KEY);

    if (storageUsers && storageUsers.length > 0 && !forceUpdate) {
      this.setUsers(storageUsers);
      return of<IUser[]>(storageUsers);
    }

    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(

      tap((users: IUser[]): void => {
        this.setUsers(users);
      }),

      catchError((error: HttpErrorResponse): Observable<IUser[]> => {

        this.notificationService.showError('Ошибка загрузки пользователей');

        return of<IUser[]>([]);
      }),

      finalize((): void => {
        this.loaderService.hideLoader();
      })
    );
  }

}
