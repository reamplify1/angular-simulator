import { IProduct } from './IProduct';

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}
