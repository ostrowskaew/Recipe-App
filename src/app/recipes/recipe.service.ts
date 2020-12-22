import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Stir Fry", "asian cousine",
     "https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/mccormick/s/800/stir_fry_vegetables_800x800.jpg"),
    new Recipe("Seitan Spaghetti", "vegetarian sphagetti",
     "https://www.bertyn.eu/wp-content/uploads/2019/03/spaghetti-bolognese-seitan-gehakt.jpg")
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }


}