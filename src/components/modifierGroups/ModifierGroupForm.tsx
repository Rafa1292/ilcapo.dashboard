import React, { useState } from 'react'
import { ModifierGroup } from '../../types/ModifierGroup'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'

interface Props {
  currentModifierGroup: ModifierGroup
  action: (input: ModifierGroup) => void
  errors?: string[]
}

const ModifierGroupForm = ({ currentModifierGroup: currentModifierGroup, action, errors }: Props) => {
  const [modifierGroup, setModifierGroup] = useState<ModifierGroup>(currentModifierGroup)
  const submitText = currentModifierGroup?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setModifierGroup({ ...modifierGroup, [name]: value })
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
              handleChange: handleChange, pattern: '[a-zA-Z0-9()\\u00E0-\\u00FC\\s?]*',
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </GenericForm>
    </>
  )
}

export default ModifierGroupForm