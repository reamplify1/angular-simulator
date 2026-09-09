import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../interfaces/IProduct';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [RatingModule, FormsModule, ButtonModule, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly cartService: CartService = inject(CartService);
  private readonly notificationService: NotificationService = inject(NotificationService);
  private readonly translateService: TranslateService = inject(TranslateService);

  readonly Math: Math = Math;
  readonly product: IProduct = this.route.snapshot.data['product'];
  readonly selectedImage: WritableSignal<string> = signal<string>('');

  readonly mainImage: Signal<string> = computed(() => {
    if (!this.product) {
      return '';
    }

    return this.selectedImage() || this.product.thumbnail;
  });

  selectImage(image: string): void {
    this.selectedImage.set(image);
  }

  readonly ratingStars: Signal<number> = computed(() => {
    return this.product ? Math.round(this.product.rating) : 0;
  });

  addToCart(): void {
    this.cartService.addToCart(this.product);

    this.notificationService.showSuccess(
      this.translateService.instant('cart.notifications.addedToCart', {
        title: this.product.title,
      }),
    );
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  goToCart(): void {
    this.router.navigate(['/products/cart']);
  }

}
