import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Product } from '../../types/Product'

interface Props {
  refreshProducts: () => void
  id: number
}

const DeleteProduct = ({ refreshProducts, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteProduct()
    await refreshProducts()
    setShow(false)
  }

  const deleteProduct = async () => {
    const response = await useDelete<Product>(`products/${id}`)
    if (!response.error) {
      refreshProducts()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='m-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar producto' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar este producto?</h6>
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

export default DeleteProduct