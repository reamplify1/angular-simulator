export interface IProductsFilters {
  category: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  limit: number;
  page: number;
}
