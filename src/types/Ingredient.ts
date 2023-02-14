import { PreparationStep } from './PreparationStep'

export interface Ingredient {
  id: number
  name: string
  cost: number
  measureId: number
  presentation: number
  price: number
  ingredientCategoryId: number
  preparationSteps: PreparationStep[]
  delete: boolean
  createdBy?: number
  updatedBy?: number
}