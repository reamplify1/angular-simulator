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
  const url: string = this.getProductsUrl(params);
  const httpParams: HttpParams = this.getProductsParams(params);

  return this.http.get<IProductsResponse>(url, {
    params: httpParams,
  });
}

  private getProductsUrl(params: IProductsParams): string {
    if (params.search) {
      return `${ this.apiUrl }/search`;
    }

    if (params.category) {
      return `${ this.apiUrl }/category/${ params.category }`;
    }

    return this.apiUrl;
  }

  private getProductsParams(params: IProductsParams): HttpParams {
    let httpParams: HttpParams = new HttpParams()
      .set('limit', params.limit)
      .set('skip', params.skip);

    if (params.search) {
      httpParams = httpParams.set('q', params.search);
    }

    if (params.sortBy) {
      httpParams = httpParams
        .set('sortBy', params.sortBy)
        .set('order', params.sortOrder);
    }

    return httpParams;
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${ this.apiUrl }/${ id }`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${ this.apiUrl }/categories`);
  }

}
