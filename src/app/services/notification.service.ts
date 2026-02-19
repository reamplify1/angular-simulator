import { Injectable } from '@angular/core';
import { MessageType } from '../../enums/Message-type';
import type { INotification } from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: INotification[] = [];

  addNotification(type: MessageType, text: string): void {

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
