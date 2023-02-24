import React, { useState } from 'react'
import CustomBtn from '../../components/generics/CustomBtn'
import SaleItemProductForm from '../../components/saleItemProducts/SaleItemProductForm'
import { buttonTypes } from '../../enums/buttonTypes'
import { useDelete, usePatch } from '../../hooks/useAPI'
import { SaleItemProduct } from '../../types/SaleItemProduct'

interface Props {
  saleItemProduct: SaleItemProduct
  saleItemId: number
  refreshSaleItem: () => void
}

const EditSaleItemProduct = ({ saleItemProduct, saleItemId, refreshSaleItem }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)

  const updateSaleItemProduct = async (saleItemProduct: SaleItemProduct) => {
    const newSaleItemProduct = { ...saleItemProduct, saleItemId: saleItemId }
    const response = await usePatch<SaleItemProduct>(`saleItemProducts/${saleItemProduct.id}`, newSaleItemProduct)
    if (!response.error) {
      refreshSaleItem()
    }
    else {
      setErrors(response.message)
    }
  }

  const deleteSaleItemProduct = async (id: number) => {
    const response = await useDelete<SaleItemProduct>(`saleItemProducts/${id}`)
    if (!response.error) {
      refreshSaleItem()
    }
    else {
      setErrors(response.message)
    }
  }
  
  return (
    <>
      {
        editMode ?
          <SaleItemProductForm cancelAction={(() => setEditMode(false))} action={updateSaleItemProduct} errors={errors} currentSaleItemProduct={saleItemProduct} /> :
          <div className="col-12 d-flex justify-content-center flex-wrap">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {saleItemProduct.quantity}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {saleItemProduct?.product?.name}
            </div>
            <div className="col-1 text-center d-flex justify-content-center align-items-center">
              {saleItemProduct.discount}
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.edit} action={(() => setEditMode(true))} />
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.delete} action={(() => deleteSaleItemProduct(saleItemProduct.id))} />
            </div>
          </div>
      }
    </>
  )
}

export default EditSaleItemProduct