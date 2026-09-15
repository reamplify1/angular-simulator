import { FormsModule } from '@angular/forms';
import { Component, computed, inject, ResourceRef, Signal } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../interfaces/IProduct';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ICategory } from '../interfaces/ICategory';
import { ICategoryOption } from '../interfaces/ICategoryOption';
import { ISortOptions } from '../interfaces/ISortOptions';
import { ButtonModule } from 'primeng/button';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductCardSkeletonComponent } from '../product-card-skeleton/product-card-skeleton.component';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IProductsResponse } from '../interfaces/IProductResponse';

@Component({
  selector: 'app-products-list',
  imports: [TableModule, InputTextModule, PaginatorModule, SelectModule, FormsModule, ButtonModule, ProductCardComponent, ProductCardSkeletonComponent, TranslatePipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {

  private readonly productsService: ProductsService = inject(ProductsService);
  private readonly router: Router = inject(Router);
  private readonly translateService: TranslateService = inject(TranslateService);

  readonly skip: Signal<number> = this.productsService.skip;

  readonly products: Signal<IProduct[]> = this.productsService.products;

  readonly productsResource: ResourceRef<IProductsResponse | undefined> = this.productsService.productsResource;

  readonly page: Signal<number> = this.productsService.page;
  readonly limit: Signal<number> = this.productsService.limit;
  readonly totalProducts: Signal<number> = this.productsService.totalProducts;
  readonly categories: Signal<ICategory[]> = this.productsService.categories;
  readonly search: Signal<string> = this.productsService.search;
  readonly sortBy: Signal<string> = this.productsService.sortBy;
  readonly sortOrder: Signal<'asc' | 'desc'> = this.productsService.sortOrder;

  readonly skeletonItems: unknown[] = Array.from({ length: 10 });

  readonly currentLanguage: Signal<LangChangeEvent | undefined> = toSignal(this.translateService.onLangChange);

  isResetFilterButtonDisabled = computed(() => {
    const isSortOrder = this.sortOrder() !== 'asc';
    return !(this.search() || this.category() || isSortOrder || this.sortBy());
  });

  onSearch(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    this.productsService.setSearchInput(input.value);
  }

  onPageChange(event: PaginatorState): void {
    if (event.rows !== this.limit()) {
      this.productsService.setLimit(event.rows!);
      return;
    }

    this.productsService.setPage(event.page! + 1);
  }

  onCategoryChange(event: SelectChangeEvent): void {
    this.productsService.setCategory(event.value);
  }

  readonly categoryOptions: Signal<ICategoryOption[]> = computed(() => {
    this.currentLanguage();

    return [
      {
        name: this.translateService.instant(
          'products.filters.allCategories',
        ),
        slug: '',
      },
      ...this.categories().map((category: ICategory) => ({
        name: category.name,
        slug: category.slug,
      })),
    ];
  });

  readonly category: Signal<string> = this.productsService.category;

  readonly sortOptions: Signal<ISortOptions[]> = computed(() => {
    this.currentLanguage();

    return [
      {
        label: this.translateService.instant('products.filters.title'),
        value: 'title',
      },
      {
        label: this.translateService.instant('products.filters.price'),
        value: 'price',
      },
      {
        label: this.translateService.instant('products.filters.rating'),
        value: 'rating',
      },
      {
        label: this.translateService.instant('products.filters.stock'),
        value: 'stock',
      },
    ];
  });

  onSortByChange(event: SelectChangeEvent): void {
    this.productsService.setSortBy(
      event.value,
      this.sortOrder(),
    );
  }

  readonly sortOrderOptions: Signal<ISortOptions[]> =
    computed(() => {
      this.currentLanguage();

      return [
        {
          label: this.translateService.instant('products.filters.ascending'),
          value: 'asc',
        },
        {
          label: this.translateService.instant('products.filters.descending'),
          value: 'desc',
        },
      ];
    });

  onSortOrderChange(event: SelectChangeEvent): void {
    this.productsService.setSortBy(this.sortBy(), event.value);
  }

  onResetFilters(): void {
    this.productsService.resetFilters();
  }

  goToCart(): void {
    this.router.navigate(['/products/cart']);
  }

}
