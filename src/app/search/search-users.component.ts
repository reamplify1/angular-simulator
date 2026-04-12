import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchUsersComponent {
  searchValue: string = '';

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchChange.emit(this.searchValue);
  }
}
