import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Stir Fry", "asian cousine",
     "https://d1e3z2jco40k3v.cloudfront.net/-/media/mccormick-us/recipes/mccormick/s/800/stir_fry_vegetables_800x800.jpg"),
    new Recipe("Seitan Spaghetti", "vegetarian sphagetti",
     "https://www.bertyn.eu/wp-content/uploads/2019/03/spaghetti-bolognese-seitan-gehakt.jpg")
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipeSelected: Recipe){
    this.recipeSelected.emit(recipeSelected);
  }



}
