import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Measure } from '../../types/Measure'
import CustomInputCheck from '../generics/CustomInputChecbox'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import { Magnitude } from '../../types/Magnitude'
import CustomInputNumber from '../generics/CustomInputNumber'

interface Props {
  currentMeasure: Measure
  action: (measure: Measure) => void
  errors?: string[]
}

const MeasureForm = ({ currentMeasure, action, errors }: Props) => {
  const [measure, setMeasure] = useState<Measure>(currentMeasure)
  const [magnitudes, setMagnitudes] = useState<Magnitude[]>([])
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

  useEffect(() => {
    const getMagnitudes = async () => {
      const response = await useGetList<Magnitude[]>('magnitudes')
      if (!response.error) {
        setMagnitudes(response.data)
      }
    }
    getMagnitudes()
  }, [])

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={measure.name}
          customInputText={
            {
              label: 'Nombre de medida', name: 'name',
              handleChange: handleChange, pattern: '[a-zA-Z0-9\\u00E0-\\u00FC\\s?]*',
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
            handleChange: handleChange, pattern: '[0-9]{1}[.]{1}[0-9]{1,2}', validationMessage: 'Debe asignar un valor entre 0 y 1 con dos decimales ej: 0.01'
          }
        } />

        <CustomInputText value={measure.abbreviation}
          customInputText={
            {
              label: 'Abreviatura', name: 'abbreviation',
              handleChange: handleChange, pattern: '[a-zA-Z0-9\\u00E0-\\u00FC\\s?]{1,3}',
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