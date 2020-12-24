import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

  ingredientsList = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient("Tomato", 3),
    new Ingredient("Seitan", 1)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(newIngredient : Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsList.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsList.next(this.ingredients.slice());
  }

}
