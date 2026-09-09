export interface IProductsParams {
  limit: number;
  skip: number;
  search: string;
  category: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}
