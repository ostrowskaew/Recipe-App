import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipe-list/recipe-resolver.service";
import { RecipesComponent } from "./recipes/recipes.component";
import { SelectRecipeInfoComponent } from "./recipes/select-recipe-info/select-recipe-info.component";

const routes: Routes = [
  { path: '', component: RecipesComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: SelectRecipeInfoComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
