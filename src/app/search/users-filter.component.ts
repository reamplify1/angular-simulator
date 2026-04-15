import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() usersFilter: EventEmitter<string> = new EventEmitter<string>();
  private destroyRef: DestroyRef = inject(DestroyRef);

  filterControl: FormControl<string> = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((value: string)  => this.usersFilter.emit(value)),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

}
