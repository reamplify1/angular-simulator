export interface IPostFormValue {
  title: string;
  body: string;
  userId: string | number;
  tags: string;
  views: number | undefined;
  reactions: {
    likes: string | number;
    dislikes: string | number;
  };
}
