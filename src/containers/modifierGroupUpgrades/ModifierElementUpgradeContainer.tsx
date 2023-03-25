import React from 'react'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import CreateModifierElementUpgrade from './CreateModifierElementUpgrade'
import EditModifierElementUpgrade from './EditModifierElementUpgrade'

interface Props {
  modifierElementUpgrade: ModifierElementUpgrade
  handleChange: (event: any) => void
  modifierGroups: ModifierGroup[]
}

const ModifierElementUpgradeContainer = ({ modifierElementUpgrade, modifierGroups, handleChange }: Props) => {
  return (
    <>
      {
        modifierElementUpgrade.id > 0 &&
        <EditModifierElementUpgrade modifierGroups={modifierGroups} handleChange={handleChange} modifierElementUpgrade={modifierElementUpgrade}/>
        ||
        <CreateModifierElementUpgrade modifierGroups={modifierGroups} handleChange={handleChange} modifierElementUpgrade={modifierElementUpgrade}/>
      }
    </>
  )
}

export default ModifierElementUpgradeContainer