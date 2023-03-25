import React from 'react'
import ModifierElementUpgradeForm from '../../components/modifierElementUpgrades/ModifierElementUpgradeForm'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'

interface Props {
  modifierGroups: ModifierGroup[],
  handleChange: (event: any) => void
  modifierElementUpgrade: ModifierElementUpgrade
}


const CreateModifierElementUpgrade = ({modifierGroups, handleChange, modifierElementUpgrade: modifierElementUpgrade}: Props) => {
  return (
    <>
      <ModifierElementUpgradeForm handleChange={handleChange} modifierElementUpgrade={modifierElementUpgrade} modifierGroups={modifierGroups}/>
    </>
  )
}
<></>
export default CreateModifierElementUpgrade