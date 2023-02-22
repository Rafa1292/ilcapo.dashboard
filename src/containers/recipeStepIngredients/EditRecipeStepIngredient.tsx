import React, { useState } from 'react'
import CustomBtn from '../../components/generics/CustomBtn'
import RecipeStepIngredientForm from '../../components/recipeStepIngredients/RecipeStepIngredientForm'
import { buttonTypes } from '../../enums/buttonTypes'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'

interface Props {
  recipeStepIngredient: RecipeStepIngredient
  editRecipeStepIngredient: (recipeStepIngredient: RecipeStepIngredient) => void
  deleteRecipeStepIngredient: (int: number) => void
}

const EditRecipeStepIngredient = ({ recipeStepIngredient, editRecipeStepIngredient, deleteRecipeStepIngredient }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)

  const action = (currentRecipeStepIngredient: RecipeStepIngredient) => {
    editRecipeStepIngredient(currentRecipeStepIngredient)
    setEditMode(false)
  }

  return (
    <>
      {
        editMode ?
          <RecipeStepIngredientForm cancelAction={(()=>setEditMode(false))} action={action} errors={errors} currentRecipeStepIngredient={recipeStepIngredient} /> :
          <div className="col-12 d-flex flex-wrap">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {recipeStepIngredient.quantity}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {recipeStepIngredient?.measure?.name}
            </div>
            <div className="col-1 text-center d-flex justify-content-center align-items-center">
              {recipeStepIngredient.ingredient.name}
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.edit} action={(() => setEditMode(true))} />
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.delete} action={(() => deleteRecipeStepIngredient(recipeStepIngredient.id))} />
            </div>
          </div>
      }
    </>
  )
}

export default EditRecipeStepIngredient