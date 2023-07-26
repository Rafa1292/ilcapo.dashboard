import { UpgradeElementPrice } from "./UpgradeElementPrice"

export interface ModifierElementUpgrade {
  id: number
  prices: UpgradeElementPrice[]
  label: string
  modifierElementId: number
  newModifierGroupId: number
  updatedBy?: number
  createdBy?: number
}