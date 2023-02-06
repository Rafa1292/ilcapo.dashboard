export interface IngredientCategory {
  id: number
  name: string
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}