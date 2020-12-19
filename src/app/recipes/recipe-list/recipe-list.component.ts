import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Seitan Spaghetti", "vegetarian sphagetti",
     "https://www.bertyn.eu/wp-content/uploads/2019/03/spaghetti-bolognese-seitan-gehakt.jpg")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
