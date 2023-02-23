import React, { useState } from 'react'
import SaleItemForm from '../../components/saleItems/SaleItemForm'
import { usePost } from '../../hooks/useAPI'
import { SaleItem } from '../../types/SaleItem'

interface Props {
  saleItem: SaleItem
  refreshSaleItems: () => void
}

const CreateSaleItem = ({ saleItem, refreshSaleItems }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newSaleItem: SaleItem) => {
    const response = await usePost<SaleItem>('saleItems', newSaleItem)
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

export default CreateSaleItem