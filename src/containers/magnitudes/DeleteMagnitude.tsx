import React from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Magnitude } from '../../types/Magnitude'

interface Props {
  refreshMagnitudes: () => void
  id: number
}

const DeleteMagnitude = ({ refreshMagnitudes, id }: Props) => {

  const [show, setShow] = React.useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteMagnitude()
    await refreshMagnitudes()
    setShow(false)
  }

  const deleteMagnitude = async () => {
    const response = await useDelete<Magnitude>(`magnitudes/${id}`)
    if (!response.error) {
      refreshMagnitudes()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar magnitud' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar esta magnitud?</h6>
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

export default DeleteMagnitude