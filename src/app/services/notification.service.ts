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

  showWarn() {
    this.addNotification(NotificationType.WARN, 'Warn message');
  }

  showError() {
    this.addNotification(NotificationType.ERROR, 'Error message');
  }

  showSuccess() {
    this.addNotification(NotificationType.SUCCESS, 'Success message');
  }

  showInfo() {
    this.addNotification(NotificationType.INFO, 'Info message');
  }

  getNotifications(): INotification[] {
    return this.notifications;
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((notification: INotification) => notification.id !== id);
  }

}
