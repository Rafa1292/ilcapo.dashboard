import React, { useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Magnitude } from '../../types/Magnitude'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentMagnitude: Magnitude
  action: (magnitude: Magnitude) => void
  errors?: string[]
}

const MagnitudeForm = ({ currentMagnitude, action, errors }: Props) => {
  const [magnitude, setMagnitude] = useState<Magnitude>(currentMagnitude)
  const submitText = currentMagnitude?.id === 0 ? 'Agregar' : 'Editar'
  
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setMagnitude({ ...magnitude, [name]: value })
  }

  const handleSubmit = () => {
    action(magnitude)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={magnitude.name}
          customInputText={
            {
              label: 'Nombre de magnitud', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </GenericForm>
    </>
  )
}

export default MagnitudeForm