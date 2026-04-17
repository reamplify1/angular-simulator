import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, Observable, combineLatest, tap, BehaviorSubject } from 'rxjs';
import type { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { NotificationService } from '../services/notification.service';
import { UserCreateComponent } from '../create-user/user-create.component';
import { UsersFilterComponent } from '../search/users-filter.component';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-users',
  imports: [UserCardComponent, UserCreateComponent, UsersFilterComponent, AsyncPipe, LoaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  private notificationService: NotificationService = inject(NotificationService);
  private userService: UserService = inject(UserService);

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filteredUsers$: Observable<IUser[]> = combineLatest<[IUser[], string]>([
    this.userService.users$,
    this.filterSubject
  ]).pipe(
    map(([users, filter]: [IUser[], string]) => {
      const value: string = filter.toLowerCase();
      return users.filter((user: IUser) => user.name.toLowerCase().includes(value));
    })
  );

  onSearch(value: string): void {
    this.filterSubject.next(value);
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
