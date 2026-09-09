import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { ProductsApiService } from './api/products-api.service';
import { IProductsParams } from '../interfaces/IProductParams';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, debounceTime, finalize, map, Observable, of, switchMap, tap } from 'rxjs';
import { IProductsResponse } from '../interfaces/IProductResponse';
import { ICategory } from '../interfaces/ICategory';
import { HttpErrorResponse } from '@angular/common/http';
import { IProductsFilters } from '../interfaces/IProductFilters';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly productsApiService: ProductsApiService = inject(ProductsApiService);
  private readonly _loading: WritableSignal<boolean> = signal(true);
  readonly loading: Signal<boolean> = this._loading.asReadonly();
  private readonly _error: WritableSignal<boolean> = signal(false);
  readonly error: Signal<boolean> = this._error.asReadonly();

  private readonly _filters: WritableSignal<IProductsFilters> = signal({
    category: '',
    sortBy: '',
    sortOrder: 'asc',
    limit: 20,
    page: 1,
  });

  readonly filters$: Observable<IProductsFilters> = toObservable(this._filters);

  readonly category: Signal<string> = computed(() => this._filters().category);
  readonly sortBy: Signal<string> = computed(() => this._filters().sortBy);

  readonly sortOrder: Signal<'asc' | 'desc'> = computed(
    () => this._filters().sortOrder,
  );

  readonly limit: Signal<number> = computed(() => this._filters().limit);
  readonly page: Signal<number> = computed(() => this._filters().page);
  readonly skip: Signal<number> = computed(
    () => (this.page() - 1) * this.limit(),
  );

  private readonly _searchInput: WritableSignal<string> = signal('');

  readonly searchInput$: Observable<string> = toObservable(
    this._searchInput,
  ).pipe(
    debounceTime(300),
  );

  readonly params$: Observable<IProductsParams> = combineLatest([
    this.searchInput$,
    this.filters$,
  ]).pipe(
    map(([search, filters]) => ({
      search,
      category: filters.category,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      limit: filters.limit,
      skip: (filters.page - 1) * filters.limit,
    })),
  );

  readonly productsResponse: Signal<IProductsResponse> = toSignal(
    this.params$.pipe(
      tap(() => {
        this._loading.set(true);
        this._error.set(false);
      }),

      switchMap((params: IProductsParams) => {
        return this.productsApiService.getProducts(params).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Products request error:', error);
            this._error.set(true);

            return of({
              products: [],
              total: 0,
              skip: 0,
              limit: params.limit,
            });
          }),

          finalize(() => this._loading.set(false)),
        );
      }),
    ),
    {
      initialValue: {
        products: [],
        total: 0,
        skip: 0,
        limit: 10,
      },
    },
  );

  readonly products: Signal<IProduct[]> = computed(
    () => this.productsResponse().products,
  );


  readonly totalProducts: Signal<number> = computed(
    () => this.productsResponse().total,
  );

  setSearch(search: string): void {
    this._searchInput.set(search);
  }

  setCategory(category: string): void {
    this._filters.update((filters: IProductsFilters) => ({
      ...filters,
      category,
      page: 1,
    }));
  }

  setSortBy(sortBy: string, sortOrder: 'asc' | 'desc'): void {
    this._filters.update((filters: IProductsFilters) => ({
      ...filters,
      sortBy,
      sortOrder,
      page: 1,
    }));
  }

  setPage(page: number): void {
    this._filters.update((filters: IProductsFilters) => ({
      ...filters,
      page,
    }));
  }

  setLimit(limit: number): void {
    this._filters.update((filters: IProductsFilters) => ({
      ...filters,
      limit,
      page: 1,
    }));
  }

  readonly categories: Signal<ICategory[]> = toSignal(
    this.productsApiService.getCategories().pipe(
      catchError((error) => {
        console.error('Categories request error:', error);
        return of([]);
      }),
    ),
    {
      initialValue: [],
    },
  );

  resetFilters(): void {
    this._filters.set({
      category: '',
      sortBy: '',
      sortOrder: 'asc',
      limit: 10,
      page: 1,
    });

    this._searchInput.set('');
  }

}
