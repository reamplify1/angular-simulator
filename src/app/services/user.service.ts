import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, tap, of, delay } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private api = inject(UserApiService);
  private loader = inject(LoaderService);

  private usersSubject = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {

    this.loader.showLoader();

    return this.api.getUsers().pipe(
      delay(2000),
      tap(users => this.setUsers(users)),

      catchError(error => {
        console.error('Ошибка загрузки пользователей', error);
        return of([]);
      }),

      finalize(() => {
        this.loader.hideLoader();
      })

    );
  }

}
