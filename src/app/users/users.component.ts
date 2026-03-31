import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  private userService = inject(UserService);

  users$ = this.userService.getUsers();

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

}
