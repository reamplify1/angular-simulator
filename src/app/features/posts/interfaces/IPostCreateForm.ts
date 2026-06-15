import { IPost } from "./IPost";

export interface IPostCreateForm extends Omit<IPost, 'id' | 'tags'> {
  tags: string;
}
