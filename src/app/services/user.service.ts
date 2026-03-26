import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, tap, of } from 'rxjs';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private api = inject(UserApiService);
  private loader = inject(LoaderService);

  private usersSubject = new BehaviorSubject<any[]>([]);
  users$ = this.usersSubject.asObservable();


  // setUsers
  setUsers(users: any[]): void {
    this.usersSubject.next(users);
  }


  // getUsers
  getUsers(): Observable<any[]> {
    return this.users$;
  }


  // loadUsers
  loadUsers(): Observable<any[]> {

    this.loader.showLoader();

    return this.api.getUsers().pipe(

      tap(users => this.setUsers(users)),

      catchError(error => {
        console.error('Ошибка загрузки пользователей', error);
        return of([]); // вернуть пустой массив
      }),

      finalize(() => {
        this.loader.hideLoader();
      })

    );
  }

}
