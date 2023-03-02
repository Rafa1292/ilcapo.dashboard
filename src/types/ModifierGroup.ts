import { GroupElement } from './GroupElement'

export interface ModifierGroup {
  id: number
  name: string
  minSelectable: number
  maxSelectable: number
  isRequired: boolean
  label: string
  elements: GroupElement[]
  delete: boolean
  updatedBy?: number
  createdBy?: number
}