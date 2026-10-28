import { Component, OnInit, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LoaderComponent } from '../../core/loader/loader.component';
import { NotificationService } from '../../core/services/notification.service';
import { PluralizePipe } from '../../shared/pipes/pluralize.pipe';
import { UsersFilterComponent } from './components/search/users-filter.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { IUser } from './interfaces/IUser';
import { UsersStore } from './store/users.store';

@Component({
  selector: 'app-users',
  imports: [UserCardComponent, UserCreateComponent, UsersFilterComponent, LoaderComponent, PluralizePipe, TranslatePipe],
  providers: [UsersStore],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {

  readonly store: InstanceType<typeof UsersStore> = inject(UsersStore);
  private notificationService: NotificationService = inject(NotificationService);
  private translateService: TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this.store.loadUsers(false);
  }

  onSearch(value: string): void {
    this.store.setSearch(value);
  }

  onDeleteUser(id: number): void {
    this.store.deleteUser(id);
  }

  addUser(user: IUser): void {
    this.store.addUser(user);
    this.notificationService.showSuccess(this.translateService.instant('users.updated'));
  }

  refresh(): void {
    this.store.loadUsers(true);
  }

}
