import React from 'react'
import { SaleItemCategory } from '../../types/SaleItemCategory'
import CreateSaleItemCategory from './CreateSaleItemCategory'
import EditSaleItemCategory from './EditSaleItemCategory'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  saleItemCategory: SaleItemCategory
  addSaleItemCategory: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshSaleItemCategories: () => void
}

const SaleItemCategoryFormContainer = ({ refreshSaleItemCategories, saleItemCategory, addSaleItemCategory, show, setShow }: Props) => {
  const title = saleItemCategory.id === 0 ? 'Agregar categoria' : 'Editar categoria'
  return (
    <>
      <Button variant={'outline-light'} className='my-2' onClick={addSaleItemCategory}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {saleItemCategory.id === 0 ?
          <CreateSaleItemCategory refreshSaleItemCategories={refreshSaleItemCategories} saleItemCategory={saleItemCategory} /> :
          <EditSaleItemCategory refreshSaleItemCategories={refreshSaleItemCategories} saleItemCategory={saleItemCategory} />}
      </CustomModal>
    </>
  )
}

export default SaleItemCategoryFormContainer