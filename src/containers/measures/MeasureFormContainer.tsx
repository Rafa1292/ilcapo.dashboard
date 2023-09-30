import React from 'react'
import { Measure } from '../../types/Measure'
import CreateMeasure from './CreateMeasure'
import EditMeasure from './EditMeasure'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { Magnitude } from '../../types/Magnitude'

interface Props {
  measure: Measure
  addMeasure: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshMeasures: () => void
  magnitudes: Magnitude[]
}

const MagnitudeFormContainer = ({ refreshMeasures, measure, magnitudes, addMeasure, show, setShow }: Props) => {
  const title = measure.id === 0 ? 'Agregar medida' : 'Editar medida'
  return (
    <>
      <Button variant={'outline-light'} className='my-2' onClick={addMeasure}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {measure.id === 0 ?
          <CreateMeasure magnitudes={magnitudes} refreshMeasures={refreshMeasures} measure={measure} /> :
          <EditMeasure magnitudes={magnitudes} refreshMeasures={refreshMeasures} measure={measure} />}
      </CustomModal>
    </>
  )
}

export default MagnitudeFormContainer