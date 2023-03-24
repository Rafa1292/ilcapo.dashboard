import React from 'react'
import ModifierGroupUpgradeForm from '../../components/modifierGroupUpgrades/ModifierGroupUpgradeForm'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierGroupUpgrade } from '../../types/ModifierGroupUpgrade'

interface Props {
  modifierGroups: ModifierGroup[],
  handleChange: (event: any) => void
  modifierGroupUpgrade: ModifierGroupUpgrade
}


const CreateModifierGroupUpgrade = ({modifierGroups, handleChange, modifierGroupUpgrade}: Props) => {
  return (
    <>
      <ModifierGroupUpgradeForm handleChange={handleChange} modifierGroupUpgrade={modifierGroupUpgrade} modifierGroups={modifierGroups}/>
    </>
  )
}
<></>
export default CreateModifierGroupUpgrade