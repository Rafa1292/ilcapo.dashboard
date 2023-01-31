import React from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Provider } from '../../types/Provider'

interface Props {
  refreshProviders: () => void
  id: number
}

const DeleteProvider = ({ refreshProviders, id }: Props) => {

  const [show, setShow] = React.useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteProvider()
    await refreshProviders()
    setShow(false)
  }

  const deleteProvider = async () => {
    const response = await useDelete<Provider>(`providers/${id}`)
    if (!response.error) {
      refreshProviders()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar proveedor' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar este proveedor?</h6>
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

export default DeleteProvider