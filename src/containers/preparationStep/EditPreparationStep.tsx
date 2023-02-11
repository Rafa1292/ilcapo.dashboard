import React, { useState } from 'react'
import IngredientForm from '../../components/ingredients/IngredientForm'
import { usePatch } from '../../hooks/useAPI'
import { Ingredient } from '../../types/Ingredient'

interface Props {
  ingredient: Ingredient
  refreshIngredients: () => void
}

const EditIngredient = ({ ingredient, refreshIngredients }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editIngredient: Ingredient) => {
    const response = await usePatch<Ingredient>(`ingredients/${editIngredient.id}`, editIngredient)
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

export default EditIngredient