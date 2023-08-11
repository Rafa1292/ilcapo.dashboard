import React from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Measure } from '../../types/Measure'
import { PayMethod } from '../../types/PayMethod'

interface Props {
  refreshPayMethods: () => void
  id: number
}

const DeletePayMethod = ({ refreshPayMethods, id }: Props) => {

  const [show, setShow] = React.useState<boolean>(false)

  const handleSubmit = async () => {
    await deletePayMethod()
    await refreshPayMethods()
    setShow(false)
  }

  const deletePayMethod = async () => {
    const response = await useDelete<PayMethod>(`paymethods/${id}`, true)
    if (!response.error) {
      refreshPayMethods()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar metodo de pago' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar este metodo?</h6>
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

export default DeletePayMethod