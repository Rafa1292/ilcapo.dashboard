import React, { useState } from 'react'
import RecipeForm from '../../components/recipes/RecipeForm'
import { usePatch } from '../../hooks/useAPI'
import { Recipe } from '../../types/Recipe'

interface Props {
  recipe: Recipe
  refreshRecipes: () => void
}

const EditRecipe = ({ recipe, refreshRecipes }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editRecipe: Recipe) => {
    const response = await usePatch<Recipe>(`recipes/${editRecipe.id}`, editRecipe)
    if (!response.error) {
      refreshRecipes()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <RecipeForm errors={errors} currentRecipe={recipe} action={handleSubmit} />
  )
}

export default EditRecipe