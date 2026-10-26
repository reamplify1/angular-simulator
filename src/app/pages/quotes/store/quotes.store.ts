import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, pipe, switchMap, tap } from 'rxjs';
import { QuotesFilter } from '../../../../enums/QuotesFilter';
import { IQuote } from '../interfaces/IQuote';
import { IQuotesState } from '../interfaces/IQuotesState';
import { QuoteApiService } from '../quote-api.service';

export const initialState: IQuotesState = {
  quotes: [],
  favorites: [],
  loading: false,
  error: null,
  filter: QuotesFilter.ALL,
  randomQuote: null,
};

export const QuotesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ quotes, favorites, filter }) => ({
    favoritesCount: computed(() => favorites().length),
    authorsCount: computed(
      () => new Set(quotes().map((quote: IQuote) => quote.author)).size,
    ),
    filteredQuotes: computed(() =>
      filter() === QuotesFilter.FAVORITES
        ? quotes().filter((quote: IQuote) => favorites().includes(quote.id))
        : quotes(),
    ),
  })),

  withMethods((store) => {
    const quoteApiService: QuoteApiService = inject(QuoteApiService);

    return {
      loadQuotes: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() =>
            quoteApiService.getQuotes().pipe(
              tap((quotes: IQuote[]) =>
                patchState(store, { quotes, loading: false }),
              ),
              catchError((error: HttpErrorResponse) => {
                patchState(store, { error: error.message, loading: false });
                return EMPTY;
              }),
            ),
          ),
        ),
      ),

      toggleFavorite(id: number): void {
        patchState(store, (state: IQuotesState) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favoriteId: number) => favoriteId !== id)
            : [...state.favorites, id],
        }));
      },

      setFilter(filter: QuotesFilter): void {
        patchState(store, { filter });
      },

      pickRandomQuote(): void {
        const quotes: IQuote[] = store.quotes();

        if (quotes.length === 0) {
          return;
        }

        const randomIndex: number = Math.floor(Math.random() * quotes.length);
        patchState(store, { randomQuote: quotes[randomIndex] });
      },
    };
  }),
);
