export interface ProductRecipe {
  id: number
  modifierElementId: number
  productId: number
  recipeId: number
  delete: boolean
  createdBy?: number
  updatedBy?: number
}