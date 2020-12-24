import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingredientsSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.getIngredients();
  }

  getIngredients() {
    this.ingredientsSub = this.shoppingListService.ingredientsList
    .subscribe((ingredients : Ingredient[]) =>
    {
      this.ingredients = ingredients;
    }
    )
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }


}
