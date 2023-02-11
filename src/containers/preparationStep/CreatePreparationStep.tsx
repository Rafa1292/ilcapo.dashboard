import React, { useState } from 'react'
import PreparationStepForm from '../../components/preparationSteps/PreparationStepForm'
import { usePost } from '../../hooks/useAPI'
import { PreparationStep } from '../../types/PreparationStep'
import { PreparationStepInput } from '../../types/PreparationStepInput'

interface Props {
  preparationStep: PreparationStep
  refreshPreparationSteps: () => void
}

const CreatePreparationStep = ({ preparationStep, refreshPreparationSteps }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newPreparationStep: PreparationStep) => {
    const response = await usePost<PreparationStep>('preparationSteps', newPreparationStep)
    if (!response.error) {
      refreshPreparationSteps()
    }
    else{
      setErrors(response.message)
    }
  }

  const addPreparationStepInput = (preparationStepInput: PreparationStepInput) => {
    preparationStep.preparationStepInputs.push(preparationStepInput)
    console.log(preparationStep)
  }

  return (
    <PreparationStepForm addPreparationStepInput={addPreparationStepInput} errors={errors} preparationStep={preparationStep} action={handleSubmit} />
  )
}

export default CreatePreparationStep