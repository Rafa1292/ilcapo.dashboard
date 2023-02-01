import React from 'react'
import { Input } from '../../types/Input'
import CreateInput from './CreateInput'
import EditInput from './EditInput'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  input: Input
  addInput: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshInputs: () => void
}

const MagnitudeFormContainer = ({ refreshInputs, input, addInput, show, setShow }: Props) => {
  const title = input.id === 0 ? 'Agregar insumo' : 'Editar insumo'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addInput}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {input.id === 0 ?
          <CreateInput refreshInputs={refreshInputs} input={input} /> :
          <EditInput refreshInputs={refreshInputs} input={input} />}
      </CustomModal>
    </>
  )
}

export default MagnitudeFormContainer