import { NotificationType } from '../../enums/Notification-type';

export interface INotification {
  id: number;
  type: NotificationType;
  text: string;
}
