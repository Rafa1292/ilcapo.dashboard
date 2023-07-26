import React from 'react'
import ModifierElementUpgradeForm from '../../components/modifierElementUpgrades/ModifierElementUpgradeForm'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import { UpgradeElementPrice } from '../../types/UpgradeElementPrice'

interface Props {
  modifierGroups: ModifierGroup[]
  handleChange: (event: any) => void
  modifierElementUpgrade: ModifierElementUpgrade
  addUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
  removeUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
}

const CreateModifierElementUpgrade = ({
  addUpgradeElementPrice,
  removeUpgradeElementPrice,
  modifierGroups,
  handleChange,
  modifierElementUpgrade: modifierElementUpgrade,
}: Props) => {
  return (
    <>
      <ModifierElementUpgradeForm
        addUpgradeElementPrice={addUpgradeElementPrice}
        removeUpgradeElementPrice={removeUpgradeElementPrice}
        handleChange={handleChange}
        modifierElementUpgrade={modifierElementUpgrade}
        modifierGroups={modifierGroups}
      />
    </>
  )
}

export default CreateModifierElementUpgrade
