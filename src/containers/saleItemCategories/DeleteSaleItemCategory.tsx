import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { SaleItemCategory } from '../../types/SaleItemCategory'

interface Props {
  refreshSaleItemCategories: () => void
  id: number
}
const DeleteSaleItemCategory = ({ refreshSaleItemCategories, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteSaleItemCategory()
    await refreshSaleItemCategories()
    setShow(false)
  }

  const deleteSaleItemCategory = async () => {
    const response = await useDelete<SaleItemCategory>(`saleItemCategories/${id}`)
    if (!response.error) {
      refreshSaleItemCategories()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar categoria' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar esta categoria?</h6>
        <div className="col-12 d-flex flex-wrap justify-content-center">
          <Button variant={'danger'} className='m-2' onClick={handleSubmit}>
            Eliminar
          </Button>
          <Button variant={'dark'} className='m-2' onClick={(() => setShow(false))}>
            Cancelar
          </Button>
        </div>
      </CustomModal>
    </>
  )
}

export default DeleteSaleItemCategory