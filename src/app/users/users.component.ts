import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  private userService = inject(UserService);
  private loader = inject(LoaderService);

  users$ = this.userService.getUsers();
  loading$ = this.loader.loading$;

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }
}
