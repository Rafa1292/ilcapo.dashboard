import React, { useState } from 'react'
import IngredientCategoryForm from '../../components/ingredientCategories/IngredientCategoryForm'
import { usePatch } from '../../hooks/useAPI'
import { IngredientCategory } from '../../types/IngredientCategory'

interface Props {
  ingredientCategory: IngredientCategory
  refreshIngredientCategories: () => void
}

const EditIngredientCategory = ({ ingredientCategory, refreshIngredientCategories }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editIngredientCategory: IngredientCategory) => {
    const response = await usePatch<IngredientCategory>(`ingredientCategories/${editIngredientCategory.id}`, editIngredientCategory)
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

export default EditIngredientCategory