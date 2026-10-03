import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { RecipeApiService } from '../recipe-api.service';
import { IRecipe } from '../interfaces/IRecipe';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';

@Injectable()
export class RecipesEffects {

  private readonly actions$: Actions = inject(Actions);
  private readonly recipeApiService: RecipeApiService = inject(RecipeApiService);

  loadRecipes$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipes),
      switchMap(() =>
        this.recipeApiService.getRecipes().pipe(
          map((recipes: IRecipe[]) => loadRecipesSuccess({ recipes })),
          catchError((error: HttpErrorResponse) =>
            of(loadRecipesFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
  
}
