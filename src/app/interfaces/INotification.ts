import { NotificationType } from "../../enums/NotificationType";

export interface INotification {
  id: number;
  type: NotificationType;
  text: string;
}
