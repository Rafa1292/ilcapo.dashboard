import React, { useState } from 'react'
import SaleItemCategoryForm from '../../components/saleItemCategories/SaleItemCategoryForm'
import { usePost } from '../../hooks/useAPI'
import { SaleItemCategory } from '../../types/SaleItemCategory'

interface Props {
  saleItemCategory: SaleItemCategory
  refreshSaleItemCategories: () => void
}

const CreateSaleItemCategory = ({ saleItemCategory, refreshSaleItemCategories }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newSaleItemCategory: SaleItemCategory) => {
    const response = await usePost<SaleItemCategory>('saleItemCategories', newSaleItemCategory)
    if (!response.error) {
      refreshSaleItemCategories()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <SaleItemCategoryForm errors={errors} currentSaleItemCategory={saleItemCategory} action={handleSubmit} />
  )
}

export default CreateSaleItemCategory