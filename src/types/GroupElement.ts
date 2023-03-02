import { ModifierElement } from './ModifierElement'

export interface GroupElement {
  id: number
  modifierGroupId: number
  modifierElementId: number
  modifierElement: ModifierElement
  delete: boolean
  createdAt?: Date
  createdBy?: number
}