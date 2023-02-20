import { Ingredient } from './Ingredient'
import { Measure } from './Measure'

export interface RecipeStepIngredient {
  id: number
  ingredientId: number
  recipeStepId: number
  quantity: number
  measureId: number
  extra: boolean
  isOptional: boolean
  measure: Measure,
  ingredient: Ingredient
  delete: boolean
  createdBy?: number
  updatedBy?: number
}