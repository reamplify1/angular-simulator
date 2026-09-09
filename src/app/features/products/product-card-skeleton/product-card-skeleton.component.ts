import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product-card-skeleton',
  imports: [SkeletonModule],
  templateUrl: './product-card-skeleton.component.html',
  styleUrl: './product-card-skeleton.component.scss',
})
export class ProductCardSkeletonComponent {

}
