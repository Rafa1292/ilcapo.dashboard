import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Menu } from '../../types/Menu'

interface Props {
  refreshMenus: () => void
  id: number
}

const DeleteMenu = ({ refreshMenus, id }: Props) => {
  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteSaleItemCategory()
    await refreshMenus()
    setShow(false)
  }

  const deleteSaleItemCategory = async () => {
    const response = await useDelete<Menu>(`menus/${id}`)
    if (!response.error) {
      refreshMenus()
    }
  }
  return (
    <>
      <Button
        variant={'outline-danger'}
        className='my-2'
        onClick={() => setShow(true)}
      >
        Eliminar
      </Button>
      <CustomModal
        title='Eliminar menu'
        show={show}
        handleClose={() => setShow(false)}
      >
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>
          ¿Estas seguro que deseas eliminar este menu?
        </h6>
        <div className='col-12 d-flex flex-wrap justify-content-center'>
          <Button variant={'danger'} className='m-2' onClick={handleSubmit}>
            Eliminar
          </Button>
          <Button
            variant={'dark'}
            className='m-2'
            onClick={() => setShow(false)}
          >
            Cancelar
          </Button>
        </div>
      </CustomModal>
    </>
  )
}

export default DeleteMenu
