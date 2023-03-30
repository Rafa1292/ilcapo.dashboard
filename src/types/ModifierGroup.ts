import { ModifierElement } from './ModifierElement'

export interface ModifierGroup {
  id: number
  name: string
  minSelectable: number
  maxSelectable: number
  isRequired: boolean
  label: string
  elements: ModifierElement[]
  delete: boolean
  updatedBy?: number
  createdBy?: number
}