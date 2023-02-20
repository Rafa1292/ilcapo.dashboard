import React, { useState } from 'react'
import CustomBtn from '../../components/generics/CustomBtn'
import RecipeStepForm from '../../components/recipeSteps/RecipeStepForm'
import { buttonTypes } from '../../enums/buttonTypes'
import { useDelete, useGet, usePatch, usePost } from '../../hooks/useAPI'
import { RecipeStep } from '../../types/RecipeStep'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'

interface Props {
  recipeStep: RecipeStep
  refreshRecipe: (id: number) => void
}

const EditRecipeStep = ({ recipeStep, refreshRecipe }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleSubmit = async (newRecipeStep: RecipeStep) => {
    const newRecipeStepIngredients = newRecipeStep.recipeStepIngredients.map((recipeStepIngredient) => {
      return {
        ...recipeStepIngredient, id: 0
      }
    })
    const sendRecipeStep: RecipeStep = {
      ...newRecipeStep,
      recipeStepIngredients: newRecipeStepIngredients
    }

    const response = await usePatch<RecipeStep>(`recipeSteps/${sendRecipeStep.id}`, sendRecipeStep)
    if (!response.error) {
      refreshRecipe(sendRecipeStep.recipeId)
      setEditMode(false)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const stepUp = async (id: number) => {
    const response = await useGet<RecipeStep>(`recipeSteps/stepUp/${id}`)
    if (!response.error) {
      refreshRecipe(recipeStep.recipeId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const stepDown = async (id: number) => {
    const response = await useGet<RecipeStep>(`recipeSteps/stepDown/${id}`)
    if (!response.error) {
      refreshRecipe(recipeStep.recipeId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }


  const handleDeleteRecipeStep = async (id: number) => {
    const response = await useDelete<RecipeStep>(`recipeSteps/${id}`)
    if (!response.error) {
      refreshRecipe(recipeStep.recipeId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const handleAddRecipeStepIngredient = async (recipeStepIngredient: RecipeStepIngredient) => {
    const response = await usePost<RecipeStepIngredient>('recipeStepIngredients', {...recipeStepIngredient, recipeStepId: recipeStep.id})
    if (!response.error) {
      refreshRecipe(recipeStep.recipeId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const handleEditRecipeStepIngredient = async (recipeStepIngredient: RecipeStepIngredient) => {
    const response = await usePatch<RecipeStepIngredient>(`recipeStepIngredients/${recipeStepIngredient.id}`, recipeStepIngredient)
    if (!response.error) {
      refreshRecipe(recipeStep.recipeId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const handleDeleteRecipeStepIngredient = async (id: number) => {
    const response = await useDelete<RecipeStepIngredient>(`recipeStepIngredients/${id}`)
    if (!response.error) {
      refreshRecipe(recipeStep.recipeId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  return (
    <>
      {
        editMode &&
        <RecipeStepForm deleteRecipeStepIngredient={handleDeleteRecipeStepIngredient}
          editRecipeStepIngredient={handleEditRecipeStepIngredient} addRecipeStepIngredient={handleAddRecipeStepIngredient}
          errors={errors} recipeStep={recipeStep} action={handleSubmit} /> ||
        <div className="d-flex flex-wrap my-4 p-4 justify-content-center shadow-sm">
          <div className="py-1 px-2 d-flex justify-content-center align-items-center">
            <CustomBtn height='20px' buttonType={buttonTypes.arrowUp} action={(() => stepUp(recipeStep.id))} />
          </div>
          <span className='fw-bold d-flex justify-content-center align-items-center'>#{recipeStep.stepNumber}</span>
          <div className="py-1 px-2 d-flex justify-content-center align-items-center">
            <CustomBtn height='20px' buttonType={buttonTypes.arrowDown} action={(() => stepDown(recipeStep.id))} />
          </div>
          <span className='fw-bold mx-2 col-4 text-center'>#{recipeStep.description}</span>
          <div className="py-1 px-1 d-flex justify-content-center align-items-center">
            <CustomBtn height='30px' buttonType={buttonTypes.edit} action={(() => setEditMode(true))} />
          </div>
          <div className="py-1 px-1 d-flex justify-content-center align-items-center">
            <CustomBtn height='30px' buttonType={buttonTypes.delete} action={(() => handleDeleteRecipeStep(recipeStep.id))} />
          </div>
        </div>
      }
    </>
  )
}

export default EditRecipeStep