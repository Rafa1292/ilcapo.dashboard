import React, { useState } from 'react'
import CustomBtn from '../../components/generics/CustomBtn'
import PreparationStepForm from '../../components/preparationSteps/PreparationStepForm'
import { buttonTypes } from '../../enums/buttonTypes'
import { useDelete, useGet, usePatch, usePost } from '../../hooks/useAPI'
import { PreparationStep } from '../../types/PreparationStep'
import { PreparationStepInput } from '../../types/PreparationStepInput'

interface Props {
  preparationStep: PreparationStep
  refreshIngredient: (id: number) => void
}

const EditPreparationStep = ({ preparationStep, refreshIngredient }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleSubmit = async (newPreparationStep: PreparationStep) => {
    const newProviderStepInputs = newPreparationStep.preparationStepInputs.map((preparationStepInput) => {
      return {
        ...preparationStepInput, id: 0
      }
    })
    const sendPreparationStep = {
      ...newPreparationStep,
      preparationStepInputs: newProviderStepInputs
    }

    const response = await usePatch<PreparationStep>(`preparationSteps/${sendPreparationStep.id}`, sendPreparationStep)
    if (!response.error) {
      refreshIngredient(sendPreparationStep.ingredientId)
      setEditMode(false)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const stepUp = async (id: number) => {
    const response = await useGet<PreparationStep>(`preparationSteps/stepUp/${id}`)
    if (!response.error) {
      refreshIngredient(preparationStep.ingredientId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const stepDown = async (id: number) => {
    const response = await useGet<PreparationStep>(`preparationSteps/stepDown/${id}`)
    if (!response.error) {
      refreshIngredient(preparationStep.ingredientId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }


  const handleDeletePreparationStep = async (id: number) => {
    const response = await useDelete<PreparationStep>(`preparationSteps/${id}`)
    if (!response.error) {
      refreshIngredient(preparationStep.ingredientId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const handleAddPreparationStepInput = async (preparationStepInput: PreparationStepInput) => {
    const response = await usePost<PreparationStepInput>('preparationStepInputs', {...preparationStepInput, preparationStepId: preparationStep.id})
    console.log(response)
    if (!response.error) {
      refreshIngredient(preparationStep.ingredientId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const handleEditPreparationStepInput = async (preparationStepInput: PreparationStepInput) => {
    const response = await usePatch<PreparationStepInput>(`preparationStepInputs/${preparationStepInput.id}`, preparationStepInput)
    if (!response.error) {
      refreshIngredient(preparationStep.ingredientId)
      setErrors([])
    }
    else {
      setErrors(response.message)
    }
  }

  const handleDeletePreparationStepInput = async (id: number) => {
    const response = await useDelete<PreparationStepInput>(`preparationStepInputs/${id}`)
    if (!response.error) {
      refreshIngredient(preparationStep.ingredientId)
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
        <PreparationStepForm deletePreparationStepInput={handleDeletePreparationStepInput}
          editPreparationStepInput={handleEditPreparationStepInput} addPreparationStepInput={handleAddPreparationStepInput}
          errors={errors} preparationStep={preparationStep} action={handleSubmit} /> ||
        <div className="d-flex flex-wrap my-4 p-4 justify-content-center shadow-sm">
          <div className="py-1 px-2 d-flex justify-content-center align-items-center">
            <CustomBtn height='20px' buttonType={buttonTypes.arrowUp} action={(() => stepUp(preparationStep.id))} />
          </div>
          <span className='fw-bold d-flex justify-content-center align-items-center'>#{preparationStep.stepNumber}</span>
          <div className="py-1 px-2 d-flex justify-content-center align-items-center">
            <CustomBtn height='20px' buttonType={buttonTypes.arrowDown} action={(() => stepDown(preparationStep.id))} />
          </div>
          <span className='fw-bold mx-2 col-4 text-center'>#{preparationStep.description}</span>
          <div className="py-1 px-1 d-flex justify-content-center align-items-center">
            <CustomBtn height='30px' buttonType={buttonTypes.edit} action={(() => setEditMode(true))} />
          </div>
          <div className="py-1 px-1 d-flex justify-content-center align-items-center">
            <CustomBtn height='30px' buttonType={buttonTypes.delete} action={(() => handleDeletePreparationStep(preparationStep.id))} />
          </div>
        </div>
      }
    </>
  )
}

export default EditPreparationStep