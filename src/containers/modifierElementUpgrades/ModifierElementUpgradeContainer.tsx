import React from 'react'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import CreateModifierElementUpgrade from './CreateModifierElementUpgrade'
import EditModifierElementUpgrade from './EditModifierElementUpgrade'
import { UpgradeElementPrice } from '../../types/UpgradeElementPrice'

interface Props {
  modifierElementUpgrade: ModifierElementUpgrade
  handleChange: (event: any) => void
  modifierGroups: ModifierGroup[]
  addUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
  removeUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
}

const ModifierElementUpgradeContainer = ({
  modifierElementUpgrade,
  modifierGroups,
  handleChange,
  addUpgradeElementPrice,
  removeUpgradeElementPrice,
}: Props) => {
  return (
    <>
      {(modifierElementUpgrade.id > 0 && (
        <EditModifierElementUpgrade
          modifierGroups={modifierGroups}
          handleChange={handleChange}
          modifierElementUpgrade={modifierElementUpgrade}
          addUpgradeElementPrice={addUpgradeElementPrice}
          removeUpgradeElementPrice={removeUpgradeElementPrice}
        />
      )) || (
        <CreateModifierElementUpgrade
          modifierGroups={modifierGroups}
          handleChange={handleChange}
          modifierElementUpgrade={modifierElementUpgrade}
          addUpgradeElementPrice={addUpgradeElementPrice}
          removeUpgradeElementPrice={removeUpgradeElementPrice}
        />
      )}
    </>
  )
}

export default ModifierElementUpgradeContainer
