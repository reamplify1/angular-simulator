import { Component, inject } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { type INotification } from '../interfaces/INotification';

@Component({
  selector: 'app-notification',
  imports: [AsyncPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {

  notificationService: NotificationService = inject(NotificationService);

  closeNotification(notification: INotification): void {
    this.notificationService.closeNotification(notification.id);
  }

}
