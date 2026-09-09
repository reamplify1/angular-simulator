import { NotificationService } from './../../../core/services/notification.service';
import { Component, inject, Signal } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ButtonModule } from 'primeng/button';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { IAuthUser } from '../../../core/interfaces/IAuthUser';
import { ICartItem } from '../interfaces/ICartItem';

@Component({
  selector: 'app-product-cart',
  imports: [ButtonModule, DecimalPipe, TranslatePipe],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.scss',
})
export class ProductCartComponent {

  private readonly cartService: CartService = inject(CartService);

  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly translateService: TranslateService = inject(TranslateService);

  readonly items: Signal<ICartItem[]> = this.cartService.items;
  readonly itemsCount: Signal<number> = this.cartService.itemsCount;
  readonly subtotal: Signal<number> = this.cartService.subtotal;
  readonly tax: Signal<number> = this.cartService.tax;
  readonly total: Signal<number> = this.cartService.total;

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  checkout(): void {
    const user: IAuthUser | null = this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    this.cartService
      .createCartFromItems(user.id)
      .pipe(
        tap(() => {
          this.cartService.clearCart();

          this.notificationService.showSuccess(
            this.translateService.instant(
              'cart.notifications.checkoutSuccess',
            ),
          );
        }),
      )
      .subscribe();
  }

}
