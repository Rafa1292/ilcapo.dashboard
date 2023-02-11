import React, { useEffect } from 'react'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import EditPreparationStepInput from './EditPreparationStepInput'
import CreatePreparationStepInput from './CreatePreparationStepInput'
import { Input } from '../../types/Input'

interface Props {
  preparationStepInput: PreparationStepInput
  addPreparationStepInput?: (preparationStepInput: PreparationStepInput) => void
}

const initialPreparationStepInput: PreparationStepInput = {
  id: 4,
  preparationStepId: 0,
  inputId: 0,
  quantity: 0,
  measureId: 0,
  delete: false,
  input: { inputCategoryId: 0 } as Input
}

const PreparationStepInputFormContainer = ({ preparationStepInput, addPreparationStepInput }: Props) => {

  return (
    <>
      {
        preparationStepInput.inputId ?
          <EditPreparationStepInput preparationStepInput={preparationStepInput} /> :
          <CreatePreparationStepInput addPreparationStepInput={addPreparationStepInput} />
      }
    </>
  )
}

export default PreparationStepInputFormContainer