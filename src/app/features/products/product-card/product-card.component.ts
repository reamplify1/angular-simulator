import { Component, input, InputSignal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {

  readonly product: InputSignal<IProduct> = input.required<IProduct>();

}
