import React from 'react'
import ModifierGroupUpgradeForm from '../../components/modifierGroupUpgrades/ModifierGroupUpgradeForm'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierGroupUpgrade } from '../../types/ModifierGroupUpgrade'

interface Props {
  modifierGroupUpgrade: ModifierGroupUpgrade
  modifierGroups: ModifierGroup[]
  handleChange: (event: any) => void
}
const EditModifierGroupUpgrade = ({ modifierGroupUpgrade, modifierGroups, handleChange }: Props) => {
  return (
    <>
      <ModifierGroupUpgradeForm modifierGroupUpgrade={modifierGroupUpgrade} handleChange={handleChange} modifierGroups={modifierGroups} />
    </>
  )
}

export default EditModifierGroupUpgrade