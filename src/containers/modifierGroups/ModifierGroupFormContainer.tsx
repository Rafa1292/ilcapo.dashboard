import React from 'react'
import { ModifierGroup } from '../../types/ModifierGroup'
import CreateModifierGroup from './CreateModifierGroup'
import EditModifierGroup from './EditModifierGroup'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  modifierGroup: ModifierGroup
  addModifierGroup: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshModifierGroups: () => void
}

const ModifierGroupFormContainer = ({ refreshModifierGroups, modifierGroup, addModifierGroup, show, setShow }: Props) => {
  const title = modifierGroup.id === 0 ? 'Agregar categoria' : 'Editar categoria'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addModifierGroup}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {modifierGroup.id === 0 ?
          <CreateModifierGroup refreshModifierGroups={refreshModifierGroups} modifierGroup={modifierGroup} /> :
          <EditModifierGroup refreshModifierGroups={refreshModifierGroups} modifierGroup={modifierGroup} />}
      </CustomModal>
    </>
  )
}

export default ModifierGroupFormContainer