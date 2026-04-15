import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, Observable, combineLatest, tap, BehaviorSubject } from 'rxjs';
import type { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { NotificationService } from '../services/notification.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../search/users-filter.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [UserCardComponent, CreateUserComponent, UsersFilterComponent, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  private notificationService: NotificationService = inject(NotificationService)
  private userService: UserService = inject(UserService);

  private search$ = new BehaviorSubject<string>('');
  private users$: Observable<IUser[]> = this.userService.users$;

  filteredUsers$: Observable<IUser[]> = combineLatest<[IUser[], string]>([
    this.users$,
    this.search$
  ]).pipe(
    map(([users, search]: [IUser[], string]) => {
      const value = search.toLowerCase();
      return users.filter(user => user.name.toLowerCase().includes(value));
    })
  );

  onSearch(value: string): void {
    this.search$.next(value);
  }

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      )
    .subscribe();
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  addUser(user: IUser): void {
    this.userService.addUser(user);
    this.notificationService.showSuccess('Пользователь успешно добавлен');
    console.log(user);
  }

  refresh(): void {
    this.userService.loadUsers(true)
    .pipe(
      tap((users: IUser[]) => {
        this.userService.setUsers(users);
        this.notificationService.showSuccess('Users are updated');
      })
    )
    .subscribe();
  }

}
