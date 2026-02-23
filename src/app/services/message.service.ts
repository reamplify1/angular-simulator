import { Injectable } from '@angular/core';
import { NotificationType } from '../../enums/NotificationType';
import type { INotification } from '../interfaces/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: INotification[] = [];

  addNotification(type: NotificationType, text: string): void {

    const newNotification: INotification = { id: Date.now(), type, text };

    this.notifications = [...this.notifications, newNotification];

    setTimeout(() => {
      this.removeNotification(newNotification.id);
    }, 5000);
  }

  getNotifications(): INotification[] {
    return this.notifications;
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((notification: INotification) => notification.id !== id);
  }

}
