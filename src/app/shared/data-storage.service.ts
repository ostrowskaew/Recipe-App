import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { query } from "@angular/animations";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  fetchRecipes() {
    return this.http.get<Recipe[]>(
        'https://recipe-app-54b5e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map( recipe => {
          return {...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.addRecipes(recipes);
      })
    );
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-app-54b5e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
    .subscribe((response) => {
      console.log(response);
    })
  }

}
