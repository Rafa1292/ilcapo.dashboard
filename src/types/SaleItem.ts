import { ItemPrice } from './ItemPrice'
import { SaleItemCategory } from './SaleItemCategory'
import { SaleItemProduct } from './SaleItemProduct'

export interface SaleItem {
  id: number
  name: string
  saleItemCategoryId: number
  saleItemCategory: SaleItemCategory,
  pictureUrl: string
  delete: boolean
  prices: ItemPrice[]
  saleItemProducts: SaleItemProduct[],
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}