import { NotificationType } from '../../enums/notificationType';

export interface INotification {
  id: number;
  type: NotificationType;
  text: string;
}
