import { ActionReducer, createReducer, on } from '@ngrx/store';
import { IRecipe } from '../interfaces/IRecipe';
import { IRecipesState } from '../interfaces/IRecipesState';
import { loadRecipes, loadRecipesFailure, loadRecipesSuccess } from './recipes.actions';

export const initialState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesReducer: ActionReducer<IRecipesState> = createReducer(
  initialState,

  on(
    loadRecipes,
    (state: IRecipesState): IRecipesState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),

  on(
    loadRecipesSuccess,
    (state: IRecipesState, { recipes }: { recipes: IRecipe[] }): IRecipesState => ({
      ...state,
      recipes: recipes,
      loading: false,
    }),
  ),

  on(
    loadRecipesFailure,
    (state: IRecipesState, { error }: { error: string }): IRecipesState => ({
      ...state,
      error: error,
      loading: false,
    }),
  ),
);
