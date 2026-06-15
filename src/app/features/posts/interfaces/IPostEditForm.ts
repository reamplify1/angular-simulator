import { IPostEditRequest } from "./IPostEditRequest";

export interface IPostEditForm extends Omit<IPostEditRequest, 'tags'> {
  tags: string;
}
