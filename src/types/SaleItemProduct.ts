import { Product } from './Product'

export interface SaleItemProduct {
  id: number
  saleItemId: number
  productId: number
  quantity: number
  discount: number
  delete: boolean
  product?: Product
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}