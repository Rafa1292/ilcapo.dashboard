import React from 'react'
import CreateSaleItemProduct from './CreateSaleItemProduct'
import { SaleItem } from '../../types/SaleItem'
import { SaleItemProduct } from '../../types/SaleItemProduct'
import EditSaleItemProduct from './EditSaleItemProduct'

interface Props {
  refreshSaleItem: () => void
  saleItem: SaleItem
  saleItemProduct: SaleItemProduct
}




const SaleItemProductFormContainer = ({ refreshSaleItem, saleItem, saleItemProduct }: Props) => {

  return (
    <>
      {
        saleItemProduct.id > 0 &&
        <EditSaleItemProduct saleItemId={saleItem.id} refreshSaleItem={refreshSaleItem} saleItemProduct={saleItemProduct}/> ||
        <CreateSaleItemProduct saleItemId={saleItem.id} refreshSaleItem={refreshSaleItem} /> 
      }
    </>
  )
}

export default SaleItemProductFormContainer