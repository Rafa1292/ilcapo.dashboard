import React from 'react'
import { Magnitude } from '../../types/Magnitude'
import CreateMagnitude from './CreateMagnitude'
import EditMagnitude from './EditMagnitude'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  magnitude: Magnitude
  addMagnitude: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshMagnitudes: () => void
}

const MagnitudeFormContainer = ({ refreshMagnitudes, magnitude, addMagnitude, show, setShow }: Props) => {
  const title = magnitude.id === 0 ? 'Agregar magnitud' : 'Editar magnitud'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addMagnitude}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {magnitude.id === 0 ?
          <CreateMagnitude refreshMagnitudes={refreshMagnitudes} magnitude={magnitude} /> :
          <EditMagnitude refreshMagnitudes={refreshMagnitudes} magnitude={magnitude} />}
      </CustomModal>
    </>
  )
}

export default MagnitudeFormContainer