import React, { useState } from 'react'
import InputCategoryForm from '../../components/inputCategories/InputCategoryForm'
import { usePatch } from '../../hooks/useAPI'
import { InputCategory } from '../../types/InputCategory'

interface Props {
  inputCategory: InputCategory
  refreshInputCategories: () => void
}

const EditInputCategory = ({ inputCategory, refreshInputCategories }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editInputCategory: InputCategory) => {
    const response = await usePatch<InputCategory>(`inputCategories/${editInputCategory.id}`, editInputCategory)
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

export default EditInputCategory