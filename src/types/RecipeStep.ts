import { RecipeStepIngredient } from './RecipeStepIngredient'

export interface RecipeStep {
  id: number
  stepNumber: number
  description: string
  cost: number
  minutesOfPreparation: number
  recipeId: number
  recipeStepIngredients: RecipeStepIngredient[]
  delete: boolean
  createdBy?: number
  updatedBy?: number
}