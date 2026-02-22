import { Injectable } from '@angular/core';
import { NotificationType } from '../../enums/otificationType';
import type { INotification } from '../interfaces/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: INotification[] = [];

  addNotification(type: NotificationType, text: string): void {

    const newNotification: INotification = { id: Date.now(), type, text };

    let newArr = [...this.notifications, newNotification];

    this.notifications = newArr;

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
