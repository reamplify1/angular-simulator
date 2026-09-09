import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductsResponse } from '../../interfaces/IProductResponse';
import { ICategory } from '../../interfaces/ICategory';
import { IProduct } from '../../interfaces/IProduct';
import { IProductsParams } from '../../interfaces/IProductParams';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'https://dummyjson.com/products';

  getProducts(params: IProductsParams): Observable<IProductsResponse> {

    let url: string = this.apiUrl;

    if (params.search) {
      url = `${ this.apiUrl }/search`;
    } else if (params.category) {
      url = `${ this.apiUrl }/category/${ params.category }`;
    }

    let httpParams: HttpParams = new HttpParams()
      .set('limit', params.limit)
      .set('skip', params.skip);

    if (params.search) {
      httpParams = httpParams.set('q', params.search);
    }

    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
      httpParams = httpParams.set('order', params.sortOrder);
    }

    return this.http.get<IProductsResponse>(url, {
      params: httpParams,
    });
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${ this.apiUrl }/${ id }`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${ this.apiUrl }/categories`);
  }

}

//search → /products/search?q=...
//category → /products/category/...
//обычный список → /products
