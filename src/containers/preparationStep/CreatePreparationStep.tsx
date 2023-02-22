import React, { useState } from 'react'
import PreparationStepForm from '../../components/preparationSteps/PreparationStepForm'
import { usePost } from '../../hooks/useAPI'
import { PreparationStep } from '../../types/PreparationStep'
import { PreparationStepInput } from '../../types/PreparationStepInput'

interface Props {
  preparationStep: PreparationStep
  addPreparationStepInput: (preparationStepInput: PreparationStepInput) => void
  editPreparationStepInput: (preparationStepInput: PreparationStepInput) => void
  deletePreparationStepInput: (int: number) => void
  refreshIngredient: (id: number) => void
}

const CreatePreparationStep = ({ preparationStep, refreshIngredient, deletePreparationStepInput, addPreparationStepInput, editPreparationStepInput }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newPreparationStep: PreparationStep) => {
    const newProviderStepInputs = newPreparationStep.preparationStepInputs.map((preparationStepInput) => {
      return {
        ...preparationStepInput, id:0
      }
    })
    const sendPreparationStep = {
      ...newPreparationStep,
      preparationStepInputs: newProviderStepInputs
    }

    const response = await usePost<PreparationStep>('preparationSteps', sendPreparationStep)
    if (!response.error) {
      refreshIngredient(sendPreparationStep.ingredientId)
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <PreparationStepForm deletePreparationStepInput={deletePreparationStepInput} editPreparationStepInput={editPreparationStepInput} addPreparationStepInput={addPreparationStepInput} errors={errors} preparationStep={preparationStep} action={handleSubmit} />
  )
}

export default CreatePreparationStep