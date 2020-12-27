import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {

  ingredientsList = new Subject<Ingredient[]>();
  idItemEdited = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Tomato", 3),
    new Ingredient("Seitan", 1)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number): Ingredient {
    return this.ingredients[id];
  }

  addIngredient(newIngredient : Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingredientsList.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
    this.ingredientsList.next(this.ingredients.slice());
  }

  updateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id] = newIngredient;
    this.ingredientsList.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsList.next(this.ingredients.slice());
  }

  selectItem(id: number) {
    this.idItemEdited.next(id);
  }

}
