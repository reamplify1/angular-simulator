import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { IRecipe } from '../interfaces/IRecipe';
import { IRecipesState } from '../interfaces/IRecipesState';

export const selectRecipesState: MemoizedSelector<object, IRecipesState> =
  createFeatureSelector<IRecipesState>('recipes');

export const selectRecipes: MemoizedSelector<object, IRecipe[]> = createSelector(
  selectRecipesState,
  (state: IRecipesState): IRecipe[] => state.recipes,
);

export const selectLoading: MemoizedSelector<object, boolean> = createSelector(
  selectRecipesState,
  (state: IRecipesState): boolean => state.loading,
);

export const selectError: MemoizedSelector<object, string | null> = createSelector(
  selectRecipesState,
  (state: IRecipesState): string | null => state.error,
);
