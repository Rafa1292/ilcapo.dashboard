import React from 'react'
import ModifierGroupUpgradeForm from '../../components/modifierGroupUpgrades/ModifierGroupUpgradeForm'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierGroupUpgrade } from '../../types/ModifierGroupUpgrade'

const initialUpgradeModifierGroup: ModifierGroupUpgrade = {
  id: 0,
  modifierGroupId: 0,
  newModifierGroupId: 0,
  price: 0,
  label: '',
  updatedBy: 1,
  createdBy: 1
}

interface Props {
  modifierGroups: ModifierGroup[],
  handleChange: (event: any) => void
}


const CreateModifierGroupUpgrade = ({modifierGroups, handleChange}: Props) => {
  return (
    <>
      <ModifierGroupUpgradeForm handleChange={handleChange} upgradeModifierGroup={initialUpgradeModifierGroup} modifierGroups={modifierGroups}/>
    </>
  )
}
<></>
export default CreateModifierGroupUpgrade