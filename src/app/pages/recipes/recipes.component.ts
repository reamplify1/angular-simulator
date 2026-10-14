import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { IRecipe } from './interfaces/IRecipe';
import { loadRecipes } from './store/recipes.actions';
import {
  selectError,
  selectLoading,
  selectRecipes,
} from './store/recipes.selectors';

@Component({
  selector: 'app-recipes',
  imports: [AsyncPipe, ButtonModule, TranslatePipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {

  private store: Store = inject(Store);

  recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  loading$: Observable<boolean> = this.store.select(selectLoading);
  error$: Observable<string | null> = this.store.select(selectError);

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
  }

  onReload(): void {
    this.store.dispatch(loadRecipes());
  }

  getTotalTime(recipe: IRecipe): number {
    return recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  }

}
