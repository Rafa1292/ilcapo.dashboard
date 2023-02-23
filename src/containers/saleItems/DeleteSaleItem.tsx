import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { SaleItem } from '../../types/SaleItem'

interface Props {
  refreshSaleItems: () => void
  id: number
}
const DeleteSaleItem = ({ refreshSaleItems, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteSaleItem()
    await refreshSaleItems()
    setShow(false)
  }

  const deleteSaleItem = async () => {
    const response = await useDelete<SaleItem>(`saleItems/${id}`)
    if (!response.error) {
      refreshSaleItems()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar categoria' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar este item?</h6>
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

export default DeleteSaleItem