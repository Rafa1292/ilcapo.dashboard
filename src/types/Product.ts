import { ProductModifier } from './ProductModifier'

export interface Product {
  id: number
  name: string
  price: number
  description: string
  pictureUrl: string
  allowsModify: boolean
  needsCommand: boolean
  productModifiers: ProductModifier[]
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}
