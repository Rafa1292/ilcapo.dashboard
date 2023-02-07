export interface Ingredient {
  id: number
  name: string
  cost: number
  measureId: number
  presentation: number
  price: number
  ingredientCategoryId: number
  delete: boolean
  createdBy?: number
  updatedBy?: number
}