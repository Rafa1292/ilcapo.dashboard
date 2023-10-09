import { ElementPrice } from './ElementPrice'
import { ModifierElementUpgrade } from './ModifierElementUpgrade'
import { ProductReference } from './ProductReference'

export interface ModifierElement {
  id: number
  name: string
  defaultRecipeId: number
  combinable: boolean
  prices: ElementPrice[]
  combinableGroupId: number
  modifierGroupId: number
  modifierUpgrade: ModifierElementUpgrade
  productReference: ProductReference
  delete: boolean
  updatedBy?: number
  createdBy?: number
}
