import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IRecipe } from './interfaces/IRecipe';
import { IRecipesResponse } from './interfaces/IRecipesResponse';

@Injectable({ providedIn: 'root' })
export class RecipeApiService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'https://dummyjson.com/recipes';

  getRecipes(): Observable<IRecipe[]> {
    return this.http
      .get<IRecipesResponse>(this.apiUrl)
      .pipe(map((response: IRecipesResponse): IRecipe[] => response.recipes));
  }

}
