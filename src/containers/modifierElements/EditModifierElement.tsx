import React, { useEffect, useState } from 'react'
import CustomBtn from '../../components/generics/CustomBtn'
import ModifierElementForm from '../../components/modifierElements/ModifierElementForm'
import { buttonTypes } from '../../enums/buttonTypes'
import { useDelete, usePatch } from '../../hooks/useAPI'
import { ModifierElement } from '../../types/ModifierElement'
import { ModifierGroup } from '../../types/ModifierGroup'

interface Props {
  modifierElement: ModifierElement
  refreshModifierGroups: () => void
  modifierGroups: ModifierGroup[]
  modifierGroupId: number
}

const EditModifierElement = ({ modifierElement, modifierGroups, modifierGroupId, refreshModifierGroups }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)

  const action = async (modifierElement: ModifierElement) => {
    console.log(modifierElement)
    const response = await usePatch(`modifierElements/${modifierElement.id}/${modifierGroupId}`, modifierElement)
    if (response.error) {
      setErrors(response.message)
    } else {
      setEditMode(false)
      refreshModifierGroups()
    }
  }

  const deletePreparationStepInput = async (id: number) => {
    const response = await useDelete(`modifierElements/${id}`)
    if (response.error) {
      setErrors(response.message)
    }
    else {
      refreshModifierGroups()
    }
  }

  return (
    <>
      {
        editMode ?
          <ModifierElementForm modifierGroups={modifierGroups} action={action} errors={errors} currentModifierElement={modifierElement} /> :
          <div className="col-12 d-flex flex-wrap justify-content-center">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {modifierElement?.name}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {modifierElement?.quantity}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {modifierElement?.price}
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.edit} action={(() => setEditMode(true))} />
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.delete} action={(() => deletePreparationStepInput(modifierElement?.id))} />
            </div>
          </div>
      }
    </>
  )
}

export default EditModifierElement