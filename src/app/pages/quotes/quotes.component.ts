import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { QuotesFilter } from '../../../enums/QuotesFilter';
import { QuotesStore } from './store/quotes.store';

@Component({
  selector: 'app-quotes',
  imports: [ButtonModule, TranslatePipe],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
})
export class QuotesComponent implements OnInit {
  
  readonly store: InstanceType<typeof QuotesStore> = inject(QuotesStore);
  readonly QuotesFilter: typeof QuotesFilter = QuotesFilter;

  ngOnInit(): void {
    this.store.loadQuotes();
  }

  onRetry(): void {
    this.store.loadQuotes();
  }

  onToggleFavorite(id: number): void {
    this.store.toggleFavorite(id);
  }

  onSetFilter(filter: QuotesFilter): void {
    this.store.setFilter(filter);
  }

  onPickRandomQuote(): void {
    this.store.pickRandomQuote();
  }

  isFavorite(id: number): boolean {
    return this.store.favorites().includes(id);
  }

}
