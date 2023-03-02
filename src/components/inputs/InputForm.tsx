import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Measure } from '../../types/Measure'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import { Input } from '../../types/Input'
import CustomInputNumber from '../generics/CustomInputNumber'
import { InputCategory } from '../../types/InputCategory'
import { Magnitude } from '../../types/Magnitude'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentInput: Input
  action: (input: Input) => void
  errors?: string[]
}

const InputForm = ({ currentInput, action, errors }: Props) => {
  const [input, setInput] = useState<Input>(currentInput)
  const [inputCategories, setInputCategories] = useState<InputCategory[]>([])
  const submitText = currentInput?.id === 0 ? 'Agregar' : 'Editar'
  const [magnitudes, setMagnitudes] = useState<Magnitude[]>([])
  const [magnitude, setMagnitude] = useState<Magnitude>()

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleChangeMagnitude = (event: any) => {
    const { value } = event.target
    setInput({ ...input, measure: { magnitudeId: parseInt(value) } as Measure, measureId: 0 })
    setMagnitude(magnitudes.find(magnitude => magnitude.id === parseInt(value)))
  }


  const handleSubmit = () => {
    action(input)
  }

  useEffect(() => {
    const getMagnitudes = async () => {
      const response = await useGetList<Magnitude[]>('magnitudes')
      if (!response.error) {
        setMagnitudes(response.data)
      }
    }
    const getInputCategories = async () => {
      const response = await useGetList<InputCategory[]>('inputCategories')
      if (!response.error) {
        setInputCategories(response.data)
      }
    }
    getMagnitudes()
    getInputCategories()
  }, [])

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={input.name}
          customInputText={
            {
              label: 'Nombre de insumo', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={input.expectedPrice} customInputNumber={
          {
            label: 'Precio esperado', name: 'expectedPrice',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese un precio válido'
          }
        } />

        <CustomInputNumber value={input.stock} customInputNumber={
          {
            label: 'Stock', name: 'stock',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese un stock válido'
          }
        } />

        <CustomInputNumber value={input.presentation} customInputNumber={
          {
            label: 'Presentación', name: 'presentation',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese una presentación válida'
          }
        } />

        <CustomInputSelect value={input.measure.magnitudeId}
          customInputSelect={
            {
              label: 'Magnitud', name: 'measureId',
              handleChange: handleChangeMagnitude, pattern: '', validationMessage: 'Seleccione una magnitud'
            }}
          data={magnitudes.map(magnitud => { return { value: magnitud.id, label: magnitud.name } })}
          defaultLegend={'Seleccione una magnitud'}
        />

        {
          magnitude?.measures &&
          <CustomInputSelect value={input.measureId}
            customInputSelect={
              {
                label: 'Medida', name: 'measureId',
                handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una medida'
              }}
            data={magnitude.measures.map(measure => { return { value: measure.id, label: measure.name } })}
            defaultLegend={'Seleccione una medida'}
          />
        }

        <CustomInputSelect value={input.inputCategoryId}
          customInputSelect={
            {
              label: 'Categoria', name: 'inputCategoryId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una categoria'
            }}
          data={inputCategories.map(inputCategory => { return { value: inputCategory.id, label: inputCategory.name } })}
          defaultLegend={'Seleccione una categoria'}
        />

      </GenericForm>
    </>
  )
}

export default InputForm