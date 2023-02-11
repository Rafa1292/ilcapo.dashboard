import React, { useEffect, useState } from 'react'
import PreparationStepInputForm from '../../components/preparationStepInputs/PreparationStepInputForm'
import { usePatch } from '../../hooks/useAPI'
import { PreparationStepInput } from '../../types/PreparationStepInput'

interface Props {
  preparationStepInput: PreparationStepInput
}

const EditPreparationStepInput = ({ preparationStepInput }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (currentPreparationStepInput: PreparationStepInput) => {
    const response = await usePatch<PreparationStepInput>(`preparationStepInputs/${currentPreparationStepInput.id}`, currentPreparationStepInput)
    if (response.error) {
      setErrors(response.message)
    }
  }

  useEffect(() => {
    console.log('edit')
  }, [])

  return (
    <PreparationStepInputForm action={handleSubmit} errors={errors} currentPreparationStepInput={preparationStepInput} />
  )
}

export default EditPreparationStepInput