import React, { useEffect, useState } from 'react'
import PreparationStepInputForm from '../../components/preparationStepInputs/PreparationStepInputForm'
import { usePost } from '../../hooks/useAPI'
import { Input } from '../../types/Input'
import { Measure } from '../../types/Measure'
import { PreparationStepInput } from '../../types/PreparationStepInput'


const initialPreparationStepInput: PreparationStepInput = {
  id: 0,
  preparationStepId: 0,
  inputId: 0,
  quantity: 0,
  measureId: 0,
  delete: false,
  input: { inputCategoryId: 0 } as Input,
  measure: {} as Measure,
  createdBy: 0,
  updatedBy: 0
}

interface Props {
  addPreparationStepInput?: (preparationStepInput: PreparationStepInput) => void
}

const CreatePreparationStepInput = ({ addPreparationStepInput }: Props) => {
  const [errors, setErrors] = useState<string[]>([])


  return (
    <div className='col-12 d-flex p-2 rounded shadow-sm mb-3'>
      <PreparationStepInputForm action={addPreparationStepInput} currentPreparationStepInput={initialPreparationStepInput} errors={errors} />
    </div>
  )
}

export default CreatePreparationStepInput