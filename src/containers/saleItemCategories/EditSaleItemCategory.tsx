import React, { useState } from 'react'
import SaleItemCategoryForm from '../../components/saleItemCategories/SaleItemCategoryForm'
import { usePatch } from '../../hooks/useAPI'
import { SaleItemCategory } from '../../types/SaleItemCategory'

interface Props {
  saleItemCategory: SaleItemCategory
  refreshSaleItemCategories: () => void
}

const EditSaleItemCategory = ({ saleItemCategory, refreshSaleItemCategories }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editSaleItemCategory: SaleItemCategory) => {
    const response = await usePatch<SaleItemCategory>(`saleItemCategories/${editSaleItemCategory.id}`, editSaleItemCategory)
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

export default EditSaleItemCategory