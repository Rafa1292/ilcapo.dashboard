import React from 'react'
import ModifierElementUpgradeForm from '../../components/modifierElementUpgrades/ModifierElementUpgradeForm'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'

interface Props {
  modifierElementUpgrade: ModifierElementUpgrade
  modifierGroups: ModifierGroup[]
  handleChange: (event: any) => void
}
const EditModifierElementUpgrade = ({ modifierElementUpgrade, modifierGroups, handleChange }: Props) => {
  return (
    <>
      <ModifierElementUpgradeForm modifierElementUpgrade={modifierElementUpgrade} handleChange={handleChange} modifierGroups={modifierGroups} />
    </>
  )
}

export default EditModifierElementUpgrade