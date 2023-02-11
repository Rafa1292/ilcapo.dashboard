import React, { useEffect, useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputNumber from '../generics/CustomInputNumber'
import { useGetList } from '../../hooks/useAPI'
import { Measure } from '../../types/Measure'
import { Ingredient } from '../../types/Ingredient'
import { IngredientCategory } from '../../types/IngredientCategory'

interface Props {
  currentIngredient: Ingredient
  action: (input: Ingredient) => void
  errors?: string[]
}

const IngredientForm = ({ currentIngredient, action, errors }: Props) => {
  const [ingredient, setIngredient] = useState<Ingredient>(currentIngredient)
  const [measures, setMeasures] = useState<Measure[]>([])
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([])
  const submitText = currentIngredient?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setIngredient({ ...ingredient, [name]: value })
  }

  const handleSubmit = () => {
    action(ingredient)
  }

  useEffect(() => {
    const getMeasures = async () => {
      const response = await useGetList<Measure[]>('measures')
      if (!response.error) {
        setMeasures(response.data)
      }
    }
    const getIngredientCategories = async () => {
      const response = await useGetList<IngredientCategory[]>('ingredientCategories')
      if (!response.error) {
        setIngredientCategories(response.data)
      }
    }
    getMeasures()
    getIngredientCategories()
  }, [])

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={ingredient.name}
          customInputText={
            {
              label: 'Nombre de ingrediente', name: 'name',
              handleChange: handleChange, pattern: '[a-zA-Z0-9\\u00E0-\\u00FC\\s?]*',
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={ingredient.price} customInputNumber={
          {
            label: 'Costo', name: 'cost',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese un precio válido'
          }
        } />

        <CustomInputNumber value={ingredient.presentation} customInputNumber={
          {
            label: 'Presentacion', name: 'presentation',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese una presentacion válida'
          }
        } />

        <CustomInputSelect value={ingredient.measureId}
          customInputSelect={
            {
              label: 'Medida', name: 'measureId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una medida'
            }}
          data={measures.map(measure => { return { value: measure.id, label: measure.name } })}
          defaultLegend={'Seleccione una medida'}
        />

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