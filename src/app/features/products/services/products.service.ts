import { computed, inject, Injectable, ResourceRef, signal, Signal, WritableSignal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { ProductsApiService } from './api/products-api.service';
import { IProductsParams } from '../interfaces/IProductParams';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { IProductsResponse } from '../interfaces/IProductResponse';
import { ICategory } from '../interfaces/ICategory';
import { IProductsState } from '../interfaces/IProductsState';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly productsApiService: ProductsApiService = inject(ProductsApiService);

  private readonly _searchInput: WritableSignal<string> = signal('');

  private readonly _state: WritableSignal<IProductsState> = signal<IProductsState>({
      category: '',
      sortBy: '',
      sortOrder: 'asc',
      limit: 20,
      page: 1,
    });

  readonly debouncedSearch: Signal<string> = toSignal(
    toObservable(this._searchInput).pipe(
      switchMap((search) =>
        search === ''
          ? of('')
          : of(search).pipe(debounceTime(300)),
      ),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  readonly category: Signal<string> = computed(() => this._state().category);

  readonly sortBy: Signal<string> = computed(() => this._state().sortBy);

  readonly sortOrder: Signal<'asc' | 'desc'> = computed(() => this._state().sortOrder);

  readonly limit: Signal<number> = computed(() => this._state().limit);

  readonly page: Signal<number> = computed(() => this._state().page);

  readonly search: Signal<string> = this._searchInput.asReadonly();

  readonly skip: Signal<number> = computed(() => (this.page() - 1) * this.limit());

  readonly params: Signal<IProductsParams> = computed(() => {
    const state: IProductsState = this._state();

    return {
      search: this.debouncedSearch(),
      category: state.category,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      limit: state.limit,
      skip: (state.page - 1) * state.limit,
    };
  });

  readonly productsResource: ResourceRef<IProductsResponse | undefined> = rxResource({
    params: () => this.params(),

    stream: ({ params }) => {
      return this.productsApiService.getProducts(params);
    },
  });

  readonly products: Signal<IProduct[]> = computed(
    () => this.productsResource.value()?.products ?? [],
  );

  readonly totalProducts: Signal<number> = computed(
    () => this.productsResource.value()?.total ?? 0,
  );

  setSearchInput(search: string): void {
    this._searchInput.set(search);
  }

  setCategory(category: string): void {
    this._state.update((state: IProductsState) => ({
      ...state,
      category,
      page: 1,
    }));
  }

  setSortBy(sortBy: string, sortOrder: 'asc' | 'desc'): void {
    this._state.update((state: IProductsState) => ({
      ...state,
      sortBy,
      sortOrder,
      page: 1,
    }));
  }

  setPage(page: number): void {
    this._state.update((state: IProductsState) => ({
      ...state,
      page,
    }));
  }

  setLimit(limit: number): void {
    this._state.update((state: IProductsState) => ({
      ...state,
      limit,
      page: 1,
    }));
  }

  readonly categories: Signal<ICategory[]> = toSignal(
    this.productsApiService.getCategories().pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Categories request error:', error);
        return of([]);
      }),
    ),
    {
      initialValue: [],
    },
  );

  resetFilters(): void {
    this._searchInput.set('');

    this._state.set({
      category: '',
      sortBy: '',
      sortOrder: 'asc',
      limit: 10,
      page: 1,
    });
  }

}
