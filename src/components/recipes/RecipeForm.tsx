import React, { useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputNumber from '../generics/CustomInputNumber'
import { Recipe } from '../../types/Recipe'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentRecipe: Recipe
  action: (input: Recipe) => void
  errors?: string[]
}

const RecipeForm = ({ currentRecipe, action, errors }: Props) => {
  const [recipe, setRecipe] = useState<Recipe>(currentRecipe)
  const submitText = currentRecipe?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setRecipe({ ...recipe, [name]: value })
  }

  const handleChangeCost = (event: any) => {
    const { name, value } = event.target
    setRecipe({ ...recipe, [name]: Number(value) })
  }

  const handleSubmit = () => {
    action(recipe)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={recipe.name}
          customInputText={
            {
              label: 'Nombre de receta', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={recipe.cost} customInputNumber={
          {
            label: 'Costo', name: 'cost',
            handleChange: handleChangeCost, pattern: regexOptions.decimal, validationMessage: 'Ingrese un precio válido'
          }
        } />
      </GenericForm>
    </>
  )
}

export default RecipeForm