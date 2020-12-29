import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDisplayed: Recipe;
  id: number;

  constructor(
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.id = +params['id'];
      this.recipeDisplayed = this.recipeService.getRecipe(this.id);
    }
    );

  }

  onToShoppingList() {
    this.slService.addIngredients(this.recipeDisplayed.ingredients);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
