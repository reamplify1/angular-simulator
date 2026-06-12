export interface IPostCreateForm {
  title: string;
  body: string;
  userId: number;
  tags: string;
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  }
}
