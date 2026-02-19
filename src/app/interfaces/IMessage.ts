import { MessageType } from '../../enums/Message-type';

export interface INotification {
  id: number;
  type: MessageType;
  text: string;
}
