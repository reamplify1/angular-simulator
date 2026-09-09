import { ICartItem } from '../interfaces/ICartItem';
import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { CartApiService } from './api/cart-api.service';
import { Observable } from 'rxjs';
import { ICart } from '../interfaces/ICart';
import { ICartProduct } from '../interfaces/ICartProduct';
import { ICartsResponse } from '../interfaces/ICartsResponse';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly cartApiService: CartApiService = inject(CartApiService);

  private readonly _items: WritableSignal<ICartItem[]> = signal<ICartItem[]>(
    [],
  );

  readonly items: Signal<ICartItem[]> = this._items.asReadonly();

  private readonly TAX_RATE: number = 0.2;


  readonly itemsCount: Signal<number> = computed(() => {
    return this._items().reduce((total: number, item: ICartItem) => {
      return total + item.quantity;
    }, 0);
  });

  readonly subtotal: Signal<number> = computed(() => {
    return this._items().reduce((total: number, item: ICartItem) => {
      return total + item.product.price * item.quantity;
    }, 0);
  });

  readonly tax: Signal<number> = computed(() => {
    return this.subtotal() * this.TAX_RATE;
  });

  readonly total: Signal<number> = computed(() => {
    return this.subtotal() + this.tax();
  });

  getCart(userId: number): Observable<ICartsResponse> {
    return this.cartApiService.getCartByUser(userId);
  }

  addToCart(product: IProduct): void {
    const existingItem: ICartItem | undefined = this._items().find(
      (item: ICartItem) => item.product.id === product.id,
    );

    if (existingItem) {
      this.increaseQuantity(product.id);
      return;
    }

    this._items.update((items: ICartItem[]) => [
      ...items,
      {
        product,
        quantity: 1,     },
    ]);
  }

  increaseQuantity(productId: number): void {
    this._items.update((items: ICartItem[]) => {
      return items.map((item: ICartItem) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });
    });
  }

  decreaseQuantity(productId: number): void {
    this._items.update((items: ICartItem[]) => {
      return items
        .map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item: ICartItem) => item.quantity > 0);
    });
  }

  clearCart(): void {
    this._items.set([]);
  }

  private getCartProducts(): ICartProduct[] {
    return this._items().map((item: ICartItem) => {
      return {
        id: item.product.id,
        quantity: item.quantity,
      };
    });
  }

  createCartFromItems(userId: number): Observable<ICart> {
    const products: ICartProduct[] = this.getCartProducts();

    return this.cartApiService.createCart(userId, products);
  }

  removeFromCart(productId: number): void {
    this._items.update((items: ICartItem[]) => {
      return items.filter(
        (item) => item.product.id !== productId,
      );
    });
  }

}
