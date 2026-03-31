import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  private userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.getUsers();

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

}
