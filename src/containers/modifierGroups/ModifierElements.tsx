import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomBtn from '../../components/generics/CustomBtn'
import CustomModal from '../../components/generics/CustomModal'
import { buttonTypes } from '../../enums/buttonTypes'
import CreateModifierElement from '../modifierElements/CreateModifierElement'
import EditModifierElement from '../modifierElements/EditModifierElement'
import '../../scss/ingredientPreparation.scss'
import { ModifierGroup } from '../../types/ModifierGroup'

interface Props {
  modifierGroup: ModifierGroup
  refreshModifierGroups: () => void
  modifierGroups: ModifierGroup[]
}

const ModifierGroups = ({ modifierGroup, modifierGroups, refreshModifierGroups }: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  return (
    <>
      <Button variant={'outline-success'} className='m-2' onClick={(() => setShow(true))}>
        Modificadores
      </Button>
      <CustomModal title='Agregar elemento' show={show} handleClose={(() => setShow(false))}>
        <div className="col-12 d-flex flex-wrap justify-content-center my-4">
          {
            showForm
            &&
            <CustomBtn buttonType={buttonTypes.cancel} height='50px' action={(() => setShowForm(false))} />
            ||
            <button className='btn btn-outline-secondary' onClick={(() => setShowForm(!showForm))}>
              Agregar elemento
            </button>
          }
        </div>
        <div className={`col-12 step-form_container ${!showForm ? '' : 'step-form_containerOpen'}`}>
          <CreateModifierElement modifierGroups={modifierGroups} refreshModifierGroups={refreshModifierGroups} modifierGroupId={modifierGroup.id}/>
        </div>

        {modifierGroup.elements.sort(function (a, b) { return a.id - b.id }).map((groupElement, index) => (
          <div className='col-12' key={index}>
            <EditModifierElement modifierGroupId={modifierGroup.id} modifierGroups={modifierGroups} refreshModifierGroups={refreshModifierGroups} modifierElement={groupElement.modifierElement}
            />
          </div>
        ))}
      </CustomModal>
    </>
  )
}

export default ModifierGroups