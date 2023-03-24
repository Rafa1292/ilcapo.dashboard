import React from 'react'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierGroupUpgrade } from '../../types/ModifierGroupUpgrade'
import CreateModifierGroupUpgrade from './CreateModifierGroupUpgrade'
import EditModifierGroupUpgrade from './EditModifierGroupUpgrade'

interface Props {
  modifierGroupUpgrade: ModifierGroupUpgrade
  handleChange: (event: any) => void
  modifierGroups: ModifierGroup[]
}

const ModifierGroupUpgradeContainer = ({ modifierGroupUpgrade, modifierGroups, handleChange }: Props) => {
  return (
    <>
      {
        modifierGroupUpgrade.id > 0 &&
        <EditModifierGroupUpgrade modifierGroups={modifierGroups} handleChange={handleChange} modifierGroupUpgrade={modifierGroupUpgrade}/>
        ||
        <CreateModifierGroupUpgrade modifierGroups={modifierGroups} handleChange={handleChange} modifierGroupUpgrade={modifierGroupUpgrade}/>
      }
    </>
  )
}

export default ModifierGroupUpgradeContainer