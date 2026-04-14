import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { delay, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  private destroyRef: DestroyRef = inject(DestroyRef);

  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      delay(300),
      distinctUntilChanged(),
      tap((value: string)  => this.searchChange.emit(value)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

}
