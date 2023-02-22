import { SaleItem } from './SaleItem'

export interface SaleItemCategory {
  id: number
  name: string
  delete: boolean
  saleItems: SaleItem[]
  createdAt?: Date
  updatedAt?: Date
  createdBy?: number
  updatedBy?: number
}