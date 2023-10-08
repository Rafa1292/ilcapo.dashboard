import { ModifierGroup } from './ModifierGroup'

export interface ProductModifier {
  id: number
  order: number
  modifierGroupId: number
  productId: number
  price: number
  minSelect: number
  maxSelect: number
  priceByGroup: boolean
  modifierGroup?: ModifierGroup
  delete: boolean
  createdBy?: number
  updatedBy?: number
}