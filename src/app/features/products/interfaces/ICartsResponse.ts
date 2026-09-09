import { ICart } from './ICart';

export interface ICartsResponse {
  carts: ICart[];
  total: number;
  skip: number;
  limit: number;
}
