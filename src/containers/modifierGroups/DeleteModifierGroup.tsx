import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { ModifierGroup } from '../../types/ModifierGroup'

interface Props {
  refreshModifierGroups: () => void
  id: number
}
const DeleteModifierGroup = ({ refreshModifierGroups, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteModifierGroup()
    await refreshModifierGroups()
    setShow(false)
  }

  const deleteModifierGroup = async () => {
    const response = await useDelete<ModifierGroup>(`modifierGroups/${id}`)
    if (!response.error) {
      refreshModifierGroups()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar grupo' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar este grupo?</h6>
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

export default DeleteModifierGroup