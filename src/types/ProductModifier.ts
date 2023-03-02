import { ModifierGroup } from './ModifierGroup'

export interface ProductModifierAttributes {
  id: number
  productId: number
  modifierGroupId: number
  modifierGroup: ModifierGroup
  delete: boolean
  createdAt?: Date
  createdBy?: number
}