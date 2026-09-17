import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from './interfaces/IProduct';
import { ProductsApiService } from './services/api/products-api.service';

export const productResolver: ResolveFn<IProduct> = (
  route: ActivatedRouteSnapshot,
): Observable<IProduct> => {
  const productsApiService: ProductsApiService = inject(ProductsApiService);

  const id: number = Number(route.paramMap.get('id'));

  return productsApiService.getProductById(id);
};
