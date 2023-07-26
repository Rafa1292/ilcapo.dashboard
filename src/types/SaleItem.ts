import { ItemPrice } from './ItemPrice'
import { SaleItemCategory } from './SaleItemCategory'
import { SaleItemProduct } from './SaleItemProduct'

export interface SaleItem {
  id: number
  name: string
  saleItemCategoryId: number
  saleItemCategory: SaleItemCategory,
  description: string
  pictureUrl: string
  delete: boolean
  itemPrices: ItemPrice[]
  saleItemProducts: SaleItemProduct[],
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}