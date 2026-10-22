import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IQuote } from './interfaces/IQuote';
import { IQuotesResponse } from './interfaces/IQuotesResponse';

@Injectable({ providedIn: 'root' })
export class QuoteApiService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'https://dummyjson.com/quotes';

  getQuotes(): Observable<IQuote[]> {
    return this.http
      .get<IQuotesResponse>(this.apiUrl)
      .pipe(map((response: IQuotesResponse): IQuote[] => response.quotes));
  }

}
