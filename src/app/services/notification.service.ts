import { INotification } from './../interfaces/INotification';
import { Injectable } from '@angular/core';
import { NotificationType } from '../../enums/NotificationType';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  export class NotificationService {

  private notificationsSubject: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([]);

  private get notifications(): INotification[] {
    return this.notificationsSubject.value;
  }

  notifications$: Observable<INotification[]> = this.notificationsSubject.asObservable();

  addNotification(type: NotificationType, text: string): void {
    const newNotification: INotification = { id: Date.now(), type, text };

    this.notificationsSubject.next([...this.notifications, newNotification]);

    setTimeout(() => {
      this.closeNotification(newNotification.id);
    }, 5000);
  }

  showWarn(message: string): void {
    this.addNotification(NotificationType.WARN, message);
  }

  showError(message: string): void {
    this.addNotification(NotificationType.ERROR, message);
  }

  showSuccess(message: string): void {
    this.addNotification(NotificationType.SUCCESS, message);
  }

  showInfo(message: string): void {
    this.addNotification(NotificationType.INFO, message);
  }

  closeNotification(id: number): void {
    const updated: INotification[] = this.notifications.filter((n: INotification) => n.id !== id);
    this.notificationsSubject.next(updated);
  }

}
