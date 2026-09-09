import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../../interfaces/ICart';
import { ICartProduct } from '../../interfaces/ICartProduct';
import { ICartsResponse } from '../../interfaces/ICartsResponse';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {

  private readonly http: HttpClient = inject(HttpClient);

  private readonly apiUrl: string = 'https://dummyjson.com/carts';

  getCartByUser(userId: number): Observable<ICartsResponse> {
    return this.http.get<ICartsResponse>(
      `${ this.apiUrl }/user/${ userId }`,
    );
  }

  createCart(userId: number, products: ICartProduct[]): Observable<ICart> {
    return this.http.post<ICart>(`${ this.apiUrl }/add`, {
      userId,
      products,
    });
  }

  updateCart(cartId: number, products: ICartProduct[]): Observable<ICart> {
    return this.http.put<ICart>(`${ this.apiUrl }/${ cartId }`, {
      products,
    });
  }

  deleteCart(cartId: number): Observable<ICart> {
    return this.http.delete<ICart>(`${ this.apiUrl }/${ cartId }`);
  }

}
