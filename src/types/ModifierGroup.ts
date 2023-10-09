import { ModifierElement } from './ModifierElement'

export interface ModifierGroup {
  id: number
  name: string
  showLabel: boolean
  elements: ModifierElement[]
  delete: boolean
  updatedBy?: number
  createdBy?: number
}