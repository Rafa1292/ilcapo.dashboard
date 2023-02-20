import React, { useEffect, useState } from 'react'
import RecipeStepIngredientForm from '../../components/recipeStepIngredients/RecipeStepIngredientForm'
import { usePost } from '../../hooks/useAPI'
import { Ingredient } from '../../types/Ingredient'
import { Measure } from '../../types/Measure'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'


const initialRecipeStepIngredient: RecipeStepIngredient = {
  id: 0,
  recipeStepId: 0,
  ingredientId: 0,
  quantity: 0,
  measureId: 0,
  delete: false,
  extra: false,
  isOptional: false,
  ingredient: { ingredientCategoryId: 0 } as Ingredient,
  measure: {} as Measure,
  createdBy: 0,
  updatedBy: 0
}

interface Props {
  addRecipeStepIngredient?: (recipeStepIngredient: RecipeStepIngredient) => void
}

const CreateRecipeStepIngredient = ({ addRecipeStepIngredient }: Props) => {
  const [errors, setErrors] = useState<string[]>([])


  return (
    <div className='col-12 d-flex p-2 rounded shadow-sm mb-3'>
      <RecipeStepIngredientForm action={addRecipeStepIngredient} currentRecipeStepIngredient={initialRecipeStepIngredient} errors={errors} />
    </div>
  )
}

export default CreateRecipeStepIngredient