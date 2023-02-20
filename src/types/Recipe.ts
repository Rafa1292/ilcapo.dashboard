import { RecipeStep } from './RecipeStep'

export interface Recipe {
  id: number
  name: string
  cost: number
  recipeSteps: RecipeStep[]
  delete: boolean
  createdBy?: number
  updatedBy?: number
}