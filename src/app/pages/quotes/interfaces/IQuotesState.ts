import { QuotesFilter } from '../../../../enums/QuotesFilter';
import { IQuote } from './IQuote';

export interface IQuotesState {
  quotes: IQuote[];
  favorites: number[];
  loading: boolean;
  error: string | null;
  filter: QuotesFilter;
  randomQuote: IQuote | null;
}
