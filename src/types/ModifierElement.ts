import { ModifierElementUpgrade } from './ModifierElementUpgrade'
import { ProductReference } from './ProductReference'

export interface ModifierElement {
  id: number
  name: string
  defaultRecipeId: number
  price: number
  quantity: number
  combinable: boolean
  numberOfParts: number
  combinableModifierGroupId: number
  modifierElementUpgrade: ModifierElementUpgrade
  productReference?: ProductReference
  delete: boolean
  updatedBy?: number
  createdBy?: number
}
