import React from 'react'
import { SaleItem } from '../../types/SaleItem'
import CreateSaleItem from './CreateSaleItem'
import EditSaleItem from './EditSaleItem'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  saleItem: SaleItem
  addSaleItem: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshSaleItems: () => void
}

const SaleItemFormContainer = ({ refreshSaleItems, saleItem, addSaleItem, show, setShow }: Props) => {
  const title = saleItem.id === 0 ? 'Agregar item' : 'Editar item'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addSaleItem}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {saleItem.id === 0 ?
          <CreateSaleItem refreshSaleItems={refreshSaleItems} saleItem={saleItem} /> :
          <EditSaleItem refreshSaleItems={refreshSaleItems} saleItem={saleItem} />}
      </CustomModal>
    </>
  )
}

export default SaleItemFormContainer