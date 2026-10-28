import { IUser } from './IUser';

export interface IUsersState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  search: string;
}
