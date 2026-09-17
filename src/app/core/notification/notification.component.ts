import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { type INotification } from '../interfaces/INotification';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  imports: [AsyncPipe, TranslatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {

  notificationService: NotificationService = inject(NotificationService);
  private readonly translateService: TranslateService = inject(TranslateService);

  closeNotification(notification: INotification): void {
    this.notificationService.closeNotification(notification.id);
  }

}
