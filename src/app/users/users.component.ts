import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import type { IUser } from '../interfaces/IUser';
import { UserCardComponent } from '../user-card/user-card.component';
import { NotificationService } from '../services/notification.service';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private notificationService: NotificationService = inject(NotificationService)
  private userService: UserService = inject(UserService);
  loading: boolean = false;

  users$: Observable<IUser[]> = this.userService.users$;

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => {
          this.userService.setUsers(users);
        })
    )
    .subscribe();
  }

  deleteUser(id: number): void {
    const users: IUser[] = this.userService.getUsers().filter(user => user.id !== id);
    this.userService.setUsers(users);
  }

  refresh(): void {
    this.loading = true;
    this.userService.loadUsers(true)
    .pipe(
      tap((users: IUser[]) =>
        this.userService.setUsers(users))
    )
    .subscribe({
      next: (users: IUser[]): void => {
        this.notificationService.showSuccess('Users are updated');
      },
      complete: (): void => {
      this.loading = false;
      },
      error: (): void => {
        this.loading = false;
      }
    });
  }

}
