import React, { useEffect, useState } from 'react'
import PreparationStepInputForm from '../../components/preparationStepInputs/PreparationStepInputForm'
import { usePost } from '../../hooks/useAPI'
import { Input } from '../../types/Input'
import { PreparationStepInput } from '../../types/PreparationStepInput'

const initialPreparationStepInput: PreparationStepInput = {
  id: 0,
  preparationStepId: 0,
  inputId: 0,
  quantity: 0,
  measureId: 0,
  delete: false,
  input: { inputCategoryId: 0 } as Input
}

interface Props {
  addPreparationStepInput?: (preparationStepInput: PreparationStepInput) => void
}

const CreatePreparationStepInput = ({ addPreparationStepInput }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [preparationStepInput, setPreparationStepInput] = useState<PreparationStepInput>(initialPreparationStepInput)

  useEffect(() => {
    console.log('create')
  }, [])

  return (
    <PreparationStepInputForm action={addPreparationStepInput} currentPreparationStepInput={initialPreparationStepInput} errors={errors} />
  )
}

export default CreatePreparationStepInput