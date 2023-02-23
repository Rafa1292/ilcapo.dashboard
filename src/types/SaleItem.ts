import { SaleItemCategory } from './SaleItemCategory'

export interface SaleItem {
  id: number
  name: string
  price: number
  saleItemCategoryId: number
  saleItemCategory: SaleItemCategory,
  description: string
  pictureUrl: string
  delete: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}