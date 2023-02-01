import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Input } from '../../types/Input'

interface Props {
  refreshInputs: () => void
  id: number
}

const DeleteInput = ({ refreshInputs, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteInput()
    await refreshInputs()
    setShow(false)
  }

  const deleteInput = async () => {
    const response = await useDelete<Input>(`inputs/${id}`)
    if (!response.error) {
      refreshInputs()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar insumo' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar este insumo?</h6>
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

export default DeleteInput