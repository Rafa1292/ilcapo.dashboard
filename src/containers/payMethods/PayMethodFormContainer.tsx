import React from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { PayMethod } from '../../types/PayMethod'
import CreatePayMethod from './CreatePayMethod'
import EditPayMethod from './EditPayMethod'

interface Props {
  payMethod: PayMethod
  addPayMethod: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshPayMethods: () => void
}

const PayMethodFormContainer = ({  refreshPayMethods, payMethod, addPayMethod, show, setShow }: Props) => {
  const title = payMethod.id === 0 ? 'Agregar' : 'Editar'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addPayMethod}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {payMethod.id === 0 ?
          <CreatePayMethod refreshPayMethods={refreshPayMethods} payMethod={payMethod} /> :
          <EditPayMethod refreshPayMethods={refreshPayMethods} payMethod={payMethod} />}
      </CustomModal>
    </>
  )
}

export default PayMethodFormContainer