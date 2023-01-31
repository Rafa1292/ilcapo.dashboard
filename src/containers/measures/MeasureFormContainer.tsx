import React from 'react'
import { Measure } from '../../types/Measure'
import CreateMeasure from './CreateMeasure'
import EditMeasure from './EditMeasure'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  measure: Measure
  addMeasure: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshMeasures: () => void
}

const MagnitudeFormContainer = ({ refreshMeasures, measure, addMeasure, show, setShow }: Props) => {
  const title = measure.id === 0 ? 'Agregar medida' : 'Editar medida'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addMeasure}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {measure.id === 0 ?
          <CreateMeasure refreshMeasures={refreshMeasures} measure={measure} /> :
          <EditMeasure refreshMeasures={refreshMeasures} measure={measure} />}
      </CustomModal>
    </>
  )
}

export default MagnitudeFormContainer