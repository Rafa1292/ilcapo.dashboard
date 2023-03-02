import React, { useEffect, useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputNumber from '../generics/CustomInputNumber'
import { useGetList } from '../../hooks/useAPI'
import { Measure } from '../../types/Measure'
import { Ingredient } from '../../types/Ingredient'
import { IngredientCategory } from '../../types/IngredientCategory'
import { Magnitude } from '../../types/Magnitude'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentIngredient: Ingredient
  action: (input: Ingredient) => void
  errors?: string[]
}

const IngredientForm = ({ currentIngredient, action, errors }: Props) => {
  const [ingredient, setIngredient] = useState<Ingredient>(currentIngredient)
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([])
  const submitText = currentIngredient?.id === 0 ? 'Agregar' : 'Editar'
  const [magnitudes, setMagnitudes] = useState<Magnitude[]>([])
  const [magnitude, setMagnitude] = useState<Magnitude>()

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setIngredient({ ...ingredient, [name]: value })
  }

  const handleSubmit = () => {
    action(ingredient)
  }

  const handleChangeMagnitude = (event: any) => {
    const { value } = event.target
    setIngredient({ ...ingredient, measure: { magnitudeId: parseInt(value) } as Measure, measureId: 0 })
    setMagnitude(magnitudes.find(magnitude => magnitude.id === parseInt(value)))
  }

  useEffect(() => {
    const getMagnitudes = async () => {
      const response = await useGetList<Magnitude[]>('magnitudes')
      if (!response.error) {
        setMagnitudes(response.data)
      }
    }
    const getIngredientCategories = async () => {
      const response = await useGetList<IngredientCategory[]>('ingredientCategories')
      if (!response.error) {
        setIngredientCategories(response.data)
      }
    }
    getMagnitudes()
    getIngredientCategories()
  }, [])

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={ingredient.name}
          customInputText={
            {
              label: 'Nombre de ingrediente', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={ingredient.cost} customInputNumber={
          {
            label: 'Costo', name: 'cost',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese un precio válido'
          }
        } />

        <CustomInputNumber value={ingredient.presentation} customInputNumber={
          {
            label: 'Presentacion', name: 'presentation',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese una presentacion válida'
          }
        } />

        <CustomInputSelect value={ingredient.measure.magnitudeId}
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
          <CustomInputSelect value={ingredient.measureId}
            customInputSelect={
              {
                label: 'Medida', name: 'measureId',
                handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una medida'
              }}
            data={magnitude.measures.map(measure => { return { value: measure.id, label: measure.name } })}
            defaultLegend={'Seleccione una medida'}
          />
        }

        <CustomInputSelect value={ingredient.ingredientCategoryId}
          customInputSelect={
            {
              label: 'Categoria', name: 'ingredientCategoryId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una categoria'
            }}
          data={ingredientCategories.map(inputCategory => { return { value: inputCategory.id, label: inputCategory.name } })}
          defaultLegend={'Seleccione una categoria'}
        />

      </GenericForm>
    </>
  )
}

export default IngredientForm