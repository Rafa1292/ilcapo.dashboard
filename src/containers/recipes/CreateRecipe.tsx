import React, { useState } from 'react'
import RecipeForm from '../../components/recipes/RecipeForm'
import { usePost } from '../../hooks/useAPI'
import { Recipe } from '../../types/Recipe'

interface Props {
  recipe: Recipe
  refreshRecipes: () => void
}

const CreateRecipe = ({ recipe, refreshRecipes }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newRecipe: Recipe) => {
    const response = await usePost<Recipe>('recipes', newRecipe)
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

export default CreateRecipe