import React, { useState } from 'react'
import { IngredientCategory } from '../../types/IngredientCategory'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentIngredientCategory: IngredientCategory
  action: (input: IngredientCategory) => void
  errors?: string[]
}

const IngredientCategoryForm = ({ currentIngredientCategory, action, errors }: Props) => {
  const [ingredientCategory, setIngredientCategory] = useState<IngredientCategory>(currentIngredientCategory)
  const submitText = currentIngredientCategory?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setIngredientCategory({ ...ingredientCategory, [name]: value })
  }

  const handleSubmit = () => {
    action(ingredientCategory)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={ingredientCategory.name}
          customInputText={
            {
              label: 'Nombre de categoria', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </GenericForm>
    </>
  )
}

export default IngredientCategoryForm