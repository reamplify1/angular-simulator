import { Routes } from '@angular/router';
import { productResolver } from './product.resolver';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products-list/products-list.component')
        .then(m => m.ProductsListComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./product-cart/product-cart.component').then(
        (m) => m.ProductCartComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./product-details/product-details.component')
        .then(m => m.ProductDetailsComponent),
    resolve: {
      product: productResolver,
    },
  },
];
