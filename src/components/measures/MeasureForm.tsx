import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Measure } from '../../types/Measure'
import CustomInputCheck from '../generics/CustomInputChecbox'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import { Magnitude } from '../../types/Magnitude'
import CustomInputNumber from '../generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentMeasure: Measure
  action: (measure: Measure) => void
  errors?: string[]
  magnitudes: Magnitude[]
}

const MeasureForm = ({ currentMeasure, action, errors, magnitudes }: Props) => {
  const [measure, setMeasure] = useState<Measure>(currentMeasure)
  const submitText = currentMeasure?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setMeasure({ ...measure, [name]: value })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setMeasure({ ...measure, [name]: checked })
  }

  const handleSubmit = () => {
    action(measure)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={measure.name}
          customInputText={
            {
              label: 'Nombre de medida', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputCheck value={measure.principalMeasure}
          customInputCheck={
            {
              label: 'Es medida principal', name: 'principalMeasure',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />

        <CustomInputNumber value={measure.value} customInputNumber={
          {
            label: 'Valor', name: 'value',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Debe asignar un valor entre 0 y 1 con dos decimales ej: 0.01'
          }
        } />

        <CustomInputText value={measure.abbreviation}
          customInputText={
            {
              label: 'Abreviatura', name: 'abbreviation',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese una abreviatura válida'
            }
          } />

        <CustomInputSelect value={measure.magnitudeId}
          customInputSelect={
            {
              label: 'Magnitud', name: 'magnitudeId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una magnitud'
            }}
          data={magnitudes.map(magnitude => { return { value: magnitude.id, label: magnitude.name } })}
          defaultLegend={'Seleccione una magnitud'}
        />

      </GenericForm>
    </>
  )
}

export default MeasureForm