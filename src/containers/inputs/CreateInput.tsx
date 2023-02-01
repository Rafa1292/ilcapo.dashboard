import React, { useState } from 'react'
import InputForm from '../../components/inputs/InputForm'
import { usePost } from '../../hooks/useAPI'
import { Input } from '../../types/Input'

interface Props {
  input: Input
  refreshInputs: () => void
}

const CreateInput = ({ input, refreshInputs }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newInput: Input) => {
    const response = await usePost<Input>('inputs', newInput)
    if (!response.error) {
      refreshInputs()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <InputForm errors={errors} currentInput={input} action={handleSubmit} />
  )
}

export default CreateInput