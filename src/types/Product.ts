export interface Product {
  id: number
  name: string
  price: number
  description: string
  pictureUrl: string
  allowsModify: boolean
  recipeId: number
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}
