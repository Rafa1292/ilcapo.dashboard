import React, { useEffect, useState } from 'react'
import { ModifierGroup } from '../../types/ModifierGroup'
import { regexOptions } from '../../enums/regexOptions'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import ModifierGroupUpgrdeForm from '../modifierGroupUpgrades/ModifierGroupUpgradeForm'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { ModifierGroupUpgrade } from '../../types/ModifierGroupUpgrade'
import CustomInputNumber from '../generics/CustomInputNumber'

interface Props {
  currentModifierGroup: ModifierGroup
  action: (input: ModifierGroup) => void
  errors?: string[]
  modifierGroups: ModifierGroup[]
}

const initialModifierGroupUpgrade: ModifierGroupUpgrade = {
  id: 0,
  modifierGroupId: 0,
  newModifierGroupId: 0,
  price: 0,
  label: '',
  updatedBy: 1,
  createdBy: 1
}

const ModifierGroupForm = ({ currentModifierGroup: currentModifierGroup, action, errors, modifierGroups }: Props) => {
  const [modifierGroup, setModifierGroup] = useState<ModifierGroup>({...currentModifierGroup, modifierGroupUpgrade: currentModifierGroup.modifierGroupUpgrade?.id > 0 ? currentModifierGroup.modifierGroupUpgrade : initialModifierGroupUpgrade})
  const submitText = currentModifierGroup?.id === 0 ? 'Agregar' : 'Editar'
  const [upgradable, setUpgradable] = useState<boolean>(false)

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setModifierGroup({ ...modifierGroup, [name]: value })
  }

  const handleIsRequiredCheck = (event: any) => {
    const { name, checked } = event.target
    setModifierGroup({ ...modifierGroup, [name]: checked })
  }

  const handleSubmit = () => {
    action(modifierGroup)
  }

  const handleModifierGroupUpgradeChange = (event: any) => {
    const { name, value } = event.target
    setModifierGroup({ ...modifierGroup, modifierGroupUpgrade: { ...modifierGroup.modifierGroupUpgrade, [name]: value } })
  }
  
  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={modifierGroup.name}
          customInputText={
            {
              label: 'Nombre de grupo', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={modifierGroup.minSelectable}
          customInputNumber={
            {
              label: 'Minimo seleccionable', name: 'minSelectable',
              handleChange: handleChange, pattern: regexOptions.integer,
              validationMessage: 'Ingrese un número válido'
            }
          } />

        <CustomInputNumber value={modifierGroup.maxSelectable}
          customInputNumber={
            {
              label: 'Maximo seleccionable', name: 'maxSelectable',
              handleChange: handleChange, pattern: regexOptions.integer,
              validationMessage: 'Ingrese un número válido'
            }
          } />

        < CustomInputCheck value={modifierGroup.isRequired}
          customInputCheck={{
            label: '¿Es obligatorio?', pattern: '', validationMessage: '',
            name: 'isRequired', handleChange: handleIsRequiredCheck
          }
          } />

        < CustomInputCheck value={upgradable}
          customInputCheck={{
            label: '¿Es mejorable?', pattern: '', validationMessage: '',
            name: 'upgradable', handleChange: () => setUpgradable(!upgradable)
          }
          } />

        {
          upgradable && 
          <div className="col-10 p-2">
            <ModifierGroupUpgrdeForm handleChange={handleModifierGroupUpgradeChange} modifierGroups={modifierGroups} upgradeModifierGroup={modifierGroup.modifierGroupUpgrade} />
          </div>
        }

      </GenericForm>
    </>
  )
}

export default ModifierGroupForm