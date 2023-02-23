import React, { useState } from 'react'
import SaleItemForm from '../../components/saleItems/SaleItemForm'
import { usePatch } from '../../hooks/useAPI'
import { SaleItem } from '../../types/SaleItem'

interface Props {
  saleItem: SaleItem
  refreshSaleItems: () => void
}

const EditSaleItem = ({ saleItem, refreshSaleItems }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editSaleItem: SaleItem) => {
    const response = await usePatch<SaleItem>(`saleItems/${editSaleItem.id}`, editSaleItem)
    if (!response.error) {
      refreshSaleItems()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <SaleItemForm errors={errors} currentSaleItem={saleItem} action={handleSubmit} />
  )
}

export default EditSaleItem