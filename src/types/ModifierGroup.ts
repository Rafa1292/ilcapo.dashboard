import { GroupElement } from './GroupElement'
import { ModifierGroupUpgrade } from './ModifierGroupUpgrade'

export interface ModifierGroup {
  id: number
  name: string
  minSelectable: number
  maxSelectable: number
  isRequired: boolean
  label: string
  elements: GroupElement[]
  modifierGroupUpgrade: ModifierGroupUpgrade
  delete: boolean
  updatedBy?: number
  createdBy?: number
}