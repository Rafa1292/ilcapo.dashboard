import React, { useState } from 'react'
import SaleItemProductForm from '../../components/saleItemProducts/SaleItemProductForm'
import { usePost } from '../../hooks/useAPI'
import { SaleItemProduct } from '../../types/SaleItemProduct'

interface Props {
  refreshSaleItem: () => void
  saleItemId: number
}

const initialSaleItemProduct: SaleItemProduct = {
  id: 0,
  saleItemId: 0,
  productId: 0,
  quantity: 0,
  discount: 0,
  delete: false,
  createdBy: 0,
  updatedBy: 0
}


const CreateSaleItemProduct = ({ refreshSaleItem, saleItemId }: Props) => {
  const [errors, setErrors] = useState<string[]>([])


  const addSaleItemProduct = async (saleItemProduct: SaleItemProduct) => {
    const newSaleItemProduct = { ...saleItemProduct, saleItemId: saleItemId }
    const response = await usePost<SaleItemProduct>('saleItemProducts', newSaleItemProduct)
    if (!response.error) {
      refreshSaleItem()
    }
    else {
      setErrors(response.message)
    }
  }

  return (
    <div className='col-12 d-flex p-2 rounded justify-content-center shadow-sm mb-3'>
      <SaleItemProductForm action={addSaleItemProduct} currentSaleItemProduct={initialSaleItemProduct} errors={errors} />
    </div>
  )
}

export default CreateSaleItemProduct