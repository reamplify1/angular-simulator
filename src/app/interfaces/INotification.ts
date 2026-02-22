import { NotificationType } from "../../enums/otificationType";

export interface INotification {
  id: number;
  type: NotificationType;
  text: string;
}
