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
  modifierGroups: ModifierGroup[]
}

const ModifierGroupFormContainer = ({ refreshModifierGroups, modifierGroups, modifierGroup, addModifierGroup, show, setShow }: Props) => {
  const title = modifierGroup.id === 0 ? 'Agregar grupo' : 'Editar grupo'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addModifierGroup}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {modifierGroup.id === 0 ?
          <CreateModifierGroup modifierGroups={modifierGroups} refreshModifierGroups={refreshModifierGroups} modifierGroup={modifierGroup} /> :
          <EditModifierGroup modifierGroups={modifierGroups} refreshModifierGroups={refreshModifierGroups} modifierGroup={modifierGroup} />}
      </CustomModal>
    </>
  )
}

export default ModifierGroupFormContainer