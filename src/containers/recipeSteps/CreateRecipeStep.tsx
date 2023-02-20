import React, { useState } from 'react'
import RecipeStepForm from '../../components/recipeSteps/RecipeStepForm'
import { usePost } from '../../hooks/useAPI'
import { RecipeStep } from '../../types/RecipeStep'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'

interface Props {
  recipeStep: RecipeStep
  addRecipeStepIngredient: (preparationStepInput: RecipeStepIngredient) => void
  editRecipeStepIngredient: (preparationStepInput: RecipeStepIngredient) => void
  deleteRecipeStepIngredient: (int: number) => void
  refreshRecipe: (id: number) => void
}

const CreateRecipeStep = ({ recipeStep, refreshRecipe, deleteRecipeStepIngredient, addRecipeStepIngredient, editRecipeStepIngredient }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newRecipeStep: RecipeStep) => {
    const newRecipeStepIngredients = newRecipeStep.recipeStepIngredients.map((recipeStepIngredient) => {
      return {
        ...recipeStepIngredient, id:0
      }
    })
    const sendRecipeStep: RecipeStep = {
      ...newRecipeStep,
      recipeStepIngredients: newRecipeStepIngredients
    }

    const response = await usePost<RecipeStep>('recipeSteps', sendRecipeStep)
    if (!response.error) {
      refreshRecipe(sendRecipeStep.recipeId)
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <RecipeStepForm deleteRecipeStepIngredient={deleteRecipeStepIngredient} editRecipeStepIngredient={editRecipeStepIngredient} addRecipeStepIngredient={addRecipeStepIngredient} errors={errors} recipeStep={recipeStep} action={handleSubmit} />
  )
}

export default CreateRecipeStep