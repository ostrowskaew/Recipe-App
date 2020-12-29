import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

constructor(private storageService: DataStorageService, private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if(recipes.length == 0) {
      return this.storageService.fetchRecipes();
    }
    else {
      return recipes;
    }

  }
}
