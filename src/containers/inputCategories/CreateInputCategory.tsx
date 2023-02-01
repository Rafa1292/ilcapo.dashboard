import React, { useState } from 'react'
import InputCategoryForm from '../../components/inputCategories/InputCategoryForm'
import { usePost } from '../../hooks/useAPI'
import { InputCategory } from '../../types/InputCategory'

interface Props {
  inputCategory: InputCategory
  refreshInputCategories: () => void
}

const CreateInputCategory = ({ inputCategory, refreshInputCategories }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newInputCategory: InputCategory) => {
    const response = await usePost<InputCategory>('inputCategories', newInputCategory)
    if (!response.error) {
      refreshInputCategories()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <InputCategoryForm errors={errors} currentInputCategory={inputCategory} action={handleSubmit} />
  )
}

export default CreateInputCategory