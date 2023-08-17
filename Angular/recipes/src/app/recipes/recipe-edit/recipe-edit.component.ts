import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id: number;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  initForm() {
    let RecipeName = '';
    let RecipeImagePath = '';
    let RecipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      RecipeName = recipe.name;
      RecipeImagePath = recipe.imagePath;
      RecipeDescription = recipe.description;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(RecipeName, Validators.required),
      imagePath: new FormControl(RecipeImagePath, Validators.required),
      description: new FormControl(RecipeDescription, Validators.required),
    });
  }
}
