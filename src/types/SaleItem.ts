import { SaleItemCategory } from './SaleItemCategory'
import { SaleItemProduct } from './SaleItemProduct'

export interface SaleItem {
  id: number
  name: string
  price: number
  saleItemCategoryId: number
  saleItemCategory: SaleItemCategory,
  description: string
  pictureUrl: string
  delete: boolean
  saleItemProducts: SaleItemProduct[],
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}