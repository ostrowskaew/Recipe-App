import { Component, OnInit } from '@angular/core';
import { FormArray, FormArrayName, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id= +params['id'];
      this.editMode = params['id'] != -1;
      console.log(this.id);
      if(this.editMode) {
        this.recipe = this.recipeService.getRecipe(this.id);
      }
      this.initForm();
    })


  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let imageUrl = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      recipeName = this.recipe.name;
      recipeDescription = this.recipe.description;
      imageUrl = this.recipe.imagePathUrl;
      if(this.recipe.ingredients.length != 0) {
        for(let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9][0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePathUrl': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['/recipes']);
  }

  onDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/)
        ])
      })
    )
  }
}
