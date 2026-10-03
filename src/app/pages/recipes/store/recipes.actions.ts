import { Action, ActionCreator, createAction, props } from '@ngrx/store';
import { IRecipe } from '../interfaces/IRecipe';

export const loadRecipes: ActionCreator<string, () => Action<string>> = createAction('[Recipes Page] Load Recipes');

export const loadRecipesSuccess: ActionCreator<
  string,
  (props: { recipes: IRecipe[] }) => { recipes: IRecipe[] } & Action<string>
> = createAction(
  '[Recipes API] Load Recipes Success',
  props<{ recipes: IRecipe[] }>(),
);

export const loadRecipesFailure: ActionCreator<
  string,
  (props: { error: string }) => { error: string } & Action<string>
> = createAction(
  '[Recipes API] Load Recipes Failure',
  props<{ error: string }>(),
);
