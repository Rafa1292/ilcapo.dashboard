import React from 'react'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'
import EditRecipeStepIngredient from './EditRecipeStepIngredient'
import CreateRecipeStepIngredient from './CreateRecipeStepIngredient'

interface Props {
  recipeStepIngredient: RecipeStepIngredient
  addRecipeStepIngredient?: (recipeStepIngredient: RecipeStepIngredient) => void
  editRecipeStepIngredient: (recipeStepIngredient: RecipeStepIngredient) => void
  deleteRecipeStepIngredient: (int: number) => void
}

const RecipeStepIngredientFormContainer = ({ recipeStepIngredient, addRecipeStepIngredient, deleteRecipeStepIngredient, editRecipeStepIngredient }: Props) => {

  return (
    <>
      {
        recipeStepIngredient.ingredientId ?
          <EditRecipeStepIngredient deleteRecipeStepIngredient={deleteRecipeStepIngredient} editRecipeStepIngredient={editRecipeStepIngredient} recipeStepIngredient={recipeStepIngredient} /> :
          <CreateRecipeStepIngredient addRecipeStepIngredient={addRecipeStepIngredient} />
      }
    </>
  )
}

export default RecipeStepIngredientFormContainer