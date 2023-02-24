import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import '../../scss/ingredientPreparation.scss'
import { SaleItem } from '../../types/SaleItem'
import { SaleItemProduct } from '../../types/SaleItemProduct'
import SaleItemProductFormContainer from './SaleItemProductFormContainer'

interface Props {
  saleItem: SaleItem
  refreshSaleItem: () => void
}

const AddProductToSaleItem = ({ saleItem, refreshSaleItem }: Props) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <>
      <Button variant={'outline-success'} className='m-2' onClick={(() => setShow(true))}>
        Productos
      </Button>
      <CustomModal title='Agregar producto' show={show} handleClose={(() => setShow(false))}>
        <SaleItemProductFormContainer saleItemProduct={{} as SaleItemProduct} saleItem={saleItem} refreshSaleItem={refreshSaleItem} />
        {saleItem.saleItemProducts.sort(function (a, b) { return a.id - b.id }).map((saleItemProduct, index) => (
          <div className='col-12' key={index}>
            <SaleItemProductFormContainer saleItemProduct={saleItemProduct} saleItem={saleItem} refreshSaleItem={refreshSaleItem} />
          </div>
        ))}
      </CustomModal>
    </>
  )
}

export default AddProductToSaleItem