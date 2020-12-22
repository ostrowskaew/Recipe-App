import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

  ingredientsList = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Tomato", 3),
    new Ingredient("Seitan", 1)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(newIngredient : Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsList.emit(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsList.emit(this.ingredients.slice());
  }

}
