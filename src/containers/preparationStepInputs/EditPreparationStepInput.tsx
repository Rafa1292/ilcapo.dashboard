import React, { useState } from 'react'
import CustomBtn from '../../components/generics/CustomBtn'
import PreparationStepInputForm from '../../components/preparationStepInputs/PreparationStepInputForm'
import { buttonTypes } from '../../enums/buttonTypes'
import { useDelete, usePatch } from '../../hooks/useAPI'
import { PreparationStepInput } from '../../types/PreparationStepInput'

interface Props {
  preparationStepInput: PreparationStepInput
  editPreparationStepInput: (preparationStepInput: PreparationStepInput) => void
  deletePreparationStepInput: (int: number) => void
}

const EditPreparationStepInput = ({ preparationStepInput, editPreparationStepInput, deletePreparationStepInput }: Props) => {
  const [errors, setErrors] = useState<string[]>([])
  const [editMode, setEditMode] = useState<boolean>(false)

  const action = (currentPreparationStepInput: PreparationStepInput) => {
    editPreparationStepInput(currentPreparationStepInput)
    setEditMode(false)
  }

  return (
    <>
      {
        editMode ?
          <PreparationStepInputForm cancelAction={(()=>setEditMode(false))} action={action} errors={errors} currentPreparationStepInput={preparationStepInput} /> :
          <div className="col-12 d-flex flex-wrap">
            <div className="col-1 d-flex justify-content-center align-items-center">
              {preparationStepInput.quantity}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {preparationStepInput?.measure?.name}
            </div>
            <div className="col-1 d-flex justify-content-center align-items-center">
              {preparationStepInput?.input?.name}
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.edit} action={(() => setEditMode(true))} />
            </div>
            <div className="py-1 px-1 d-flex justify-content-center align-items-center">
              <CustomBtn height='30px' buttonType={buttonTypes.delete} action={(() => deletePreparationStepInput(preparationStepInput.id))} />
            </div>
          </div>
      }
    </>
  )
}

export default EditPreparationStepInput