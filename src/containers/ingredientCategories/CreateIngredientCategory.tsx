import React, { useState } from 'react'
import IngredientCategoryForm from '../../components/ingredientCategories/IngredientCategoryForm'
import { usePost } from '../../hooks/useAPI'
import { IngredientCategory } from '../../types/IngredientCategory'

interface Props {
  ingredientCategory: IngredientCategory
  refreshIngredientCategories: () => void
}

const CreateIngredientCategory = ({ ingredientCategory, refreshIngredientCategories }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newIngredientCategory: IngredientCategory) => {
    const response = await usePost<IngredientCategory>('ingredientCategories', newIngredientCategory)
    if (!response.error) {
      refreshIngredientCategories()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <IngredientCategoryForm errors={errors} currentIngredientCategory={ingredientCategory} action={handleSubmit} />
  )
}

export default CreateIngredientCategory