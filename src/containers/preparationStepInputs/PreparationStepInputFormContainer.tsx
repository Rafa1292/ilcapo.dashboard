import React from 'react'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import EditPreparationStepInput from './EditPreparationStepInput'
import CreatePreparationStepInput from './CreatePreparationStepInput'

interface Props {
  preparationStepInput: PreparationStepInput
  addPreparationStepInput?: (preparationStepInput: PreparationStepInput) => void
  editPreparationStepInput: (preparationStepInput: PreparationStepInput) => void
  deletePreparationStepInput: (int: number) => void
}

const PreparationStepInputFormContainer = ({ preparationStepInput, addPreparationStepInput, deletePreparationStepInput, editPreparationStepInput }: Props) => {

  return (
    <>
      {
        preparationStepInput.inputId ?
          <EditPreparationStepInput deletePreparationStepInput={deletePreparationStepInput} editPreparationStepInput={editPreparationStepInput} preparationStepInput={preparationStepInput} /> :
          <CreatePreparationStepInput addPreparationStepInput={addPreparationStepInput} />
      }
    </>
  )
}

export default PreparationStepInputFormContainer