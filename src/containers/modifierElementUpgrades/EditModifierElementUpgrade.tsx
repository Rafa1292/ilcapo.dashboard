import React from 'react'
import ModifierElementUpgradeForm from '../../components/modifierElementUpgrades/ModifierElementUpgradeForm'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import { UpgradeElementPrice } from '../../types/UpgradeElementPrice'

interface Props {
  modifierElementUpgrade: ModifierElementUpgrade
  modifierGroups: ModifierGroup[]
  handleChange: (event: any) => void
  addUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
  removeUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
}
const EditModifierElementUpgrade = ({
  modifierElementUpgrade,
  modifierGroups,
  handleChange,
  addUpgradeElementPrice,
  removeUpgradeElementPrice,
}: Props) => {
  return (
    <>
      <ModifierElementUpgradeForm
        addUpgradeElementPrice={addUpgradeElementPrice}
        removeUpgradeElementPrice={removeUpgradeElementPrice}
        modifierElementUpgrade={modifierElementUpgrade}
        handleChange={handleChange}
        modifierGroups={modifierGroups}
      />
    </>
  )
}

export default EditModifierElementUpgrade
