import { ElementPrice } from './ElementPrice'
import { ModifierElementUpgrade } from './ModifierElementUpgrade'
import { ProductReference } from './ProductReference'

export interface ModifierElement {
  id: number
  name: string
  defaultRecipeId: number
  prices: ElementPrice[]
  quantity: number
  combinable: boolean
  numberOfParts: number
  modifierGroupId: number
  combinableModifierGroupId: number
  modifierUpgrade: ModifierElementUpgrade
  productReference: ProductReference
  delete: boolean
  updatedBy?: number
  createdBy?: number
}
