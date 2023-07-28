import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  setShowRecipeDetails() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

  constructor(private recipeService: RecipesService) {}
}
