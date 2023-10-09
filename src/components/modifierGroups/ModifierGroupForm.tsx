import React, { useState } from 'react'
import { ModifierGroup } from '../../types/ModifierGroup'
import { regexOptions } from '../../enums/regexOptions'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import CustomInputCheck from '../generics/CustomInputChecbox'

interface Props {
  currentModifierGroup: ModifierGroup
  action: (input: ModifierGroup) => void
  errors?: string[]
  modifierGroups: ModifierGroup[]
}

const ModifierGroupForm = ({ currentModifierGroup: currentModifierGroup, action, errors, modifierGroups }: Props) => {
  const [modifierGroup, setModifierGroup] = useState<ModifierGroup>({ ...currentModifierGroup })
  const submitText = currentModifierGroup?.id === 0 ? 'Agregar' : 'Editar'

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

        < CustomInputCheck value={modifierGroup.showLabel}
          customInputCheck={{
            label: '¿Mostrar etiqueta?', pattern: '', validationMessage: '',
            name: 'showLabel', handleChange: handleIsRequiredCheck
          }
          } />

      </GenericForm>
    </>
  )
}

export default ModifierGroupForm