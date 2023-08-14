import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'Pancakes',
      'Pancakes with syrup are delicious!',
      'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      [new Ingredient('Flour', 1), new Ingredient('Eggs', 2)]
    ),
    new Recipe(
      'Some asian food',
      'This tastes like a fucking shit!',
      'https://images.pexels.com/photos/2365945/pexels-photo-2365945.jpeg',
      [new Ingredient('Pasta', 5), new Ingredient('Chicken', 10)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  constructor(private shoppingListService: ShoppingListService) {}
}
