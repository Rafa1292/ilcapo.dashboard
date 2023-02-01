import React, { useState } from 'react'
import InputForm from '../../components/inputs/InputForm'
import { usePatch } from '../../hooks/useAPI'
import { Input } from '../../types/Input'

interface Props {
  input: Input
  refreshInputs: () => void
}

const EditInput = ({ input, refreshInputs }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editInput: Input) => {
    const response = await usePatch<Input>(`inputs/${editInput.id}`, editInput)
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

export default EditInput