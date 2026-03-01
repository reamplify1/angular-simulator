import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NotificationService } from '../services/notification.service';
import { type INotification } from '../interfaces/INotification';

@Component({
  selector: 'app-notification',
  imports: [NgTemplateOutlet],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {

  notificationService: NotificationService = inject(NotificationService);

  closeNotification(notification: INotification) {
    this.notificationService.removeNotification(notification.id);
  }
}
