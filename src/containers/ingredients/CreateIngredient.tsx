import React, { useState } from 'react'
import IngredientForm from '../../components/ingredients/IngredientForm'
import { usePost } from '../../hooks/useAPI'
import { Ingredient } from '../../types/Ingredient'

interface Props {
  ingredient: Ingredient
  refreshIngredients: () => void
}

const CreateIngredient = ({ ingredient, refreshIngredients }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newIngredient: Ingredient) => {
    const response = await usePost<Ingredient>('ingredients', newIngredient)
    if (!response.error) {
      refreshIngredients()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <IngredientForm errors={errors} currentIngredient={ingredient} action={handleSubmit} />
  )
}

export default CreateIngredient