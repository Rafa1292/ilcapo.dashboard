import { Ingredient } from './Ingredient'

export interface IngredientCategory {
  id: number
  name: string
  delete: boolean
  ingredients: Ingredient[]
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}