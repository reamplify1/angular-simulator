import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { map, Observable, combineLatest, tap, BehaviorSubject } from 'rxjs';
import type { IUser } from './interfaces/IUser';
import { UserCardComponent } from './components/user-card/user-card.component';
import { NotificationService } from '../../core/services/notification.service';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UsersFilterComponent } from './components/search/users-filter.component';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../core/loader/loader.component';
import { PluralizePipe } from '../../shared/pipes/pluralize.pipe';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  imports: [
    UserCardComponent,
    UserCreateComponent,
    UsersFilterComponent,
    AsyncPipe,
    LoaderComponent,
    PluralizePipe,
    TranslatePipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {

  private notificationService: NotificationService = inject(NotificationService);
  private userService: UserService = inject(UserService);
  private translateService: TranslateService = inject(TranslateService);

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    '',
  );

  filteredUsers$: Observable<IUser[]> = combineLatest<[IUser[], string]>([
    this.userService.users$,
    this.filterSubject,
  ]).pipe(
    map(([users, filter]: [IUser[], string]) => {
      const value: string = filter.trim().toLowerCase();

      if (!value) {
        return users;
      }

      return users.filter((user: IUser) =>
        user.name.trim().toLowerCase().includes(value),
      );
    }),
  );

  onSearch(value: string): void {
    this.filterSubject.next(value);
  }

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .pipe(tap((users: IUser[]) => this.userService.setUsers(users)))
      .subscribe();
  }

  onDeleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  addUser(user: IUser): void {
    this.userService.addUser(user);
    this.notificationService.showSuccess(
      this.translateService.instant('users.updated'),
    );
    console.log(user);
  }

  refresh(): void {
    this.userService
      .loadUsers(true)
      .pipe(
        tap((users: IUser[]) => {
          this.userService.setUsers(users);
          this.notificationService.showSuccess(
            this.translateService.instant('users.created'),
          );
        }),
      )
      .subscribe();
  }

}
