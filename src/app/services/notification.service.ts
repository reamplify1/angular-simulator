import { INotification } from './../interfaces/INotification';
import { Injectable } from '@angular/core';
import { NotificationType } from '../../enums/NotificationType';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: INotification[] = [];

  private addNotification(type: NotificationType, text: string): void {

    const newNotification: INotification = { id: Date.now(), type, text };

    this.notifications = [...this.notifications, newNotification];

    setTimeout(() => {
      this.removeNotification(newNotification.id);
    }, 5000);
  }

  showWarn(message: string): void {
    this.addNotification(NotificationType.WARN, message);
  }

  showError(message: string): void  {
    this.addNotification(NotificationType.ERROR, message);
  }

  showSuccess(message: string): void  {
    this.addNotification(NotificationType.SUCCESS, message);
  }

  showInfo(message: string): void  {
    this.addNotification(NotificationType.INFO, message);
  }

  getNotifications(): INotification[] {
    return this.notifications;
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((notification: INotification) => notification.id !== id);
  }

}
