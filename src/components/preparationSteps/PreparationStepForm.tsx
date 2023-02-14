import React, { useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputNumber from '../generics/CustomInputNumber'
import { PreparationStep } from '../../types/PreparationStep'
import PreparationStepInputFormContainer from '../../containers/preparationStepInputs/PreparationStepInputFormContainer'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import * as validator from '../../utils/errorValidation'
interface Props {
  preparationStep: PreparationStep
  action: (preparationStep: PreparationStep) => void
  errors?: string[]
  addPreparationStepInput: (preparationStepInput: PreparationStepInput) => void
  editPreparationStepInput: (preparationStepInput: PreparationStepInput) => void
  deletePreparationStepInput: (int: number) => void
}

const PreparationStepForm = ({ preparationStep, action, deletePreparationStepInput, errors, addPreparationStepInput, editPreparationStepInput }: Props) => {
  const [currentPreparationStep, setCurrentPreparationStep] = useState<PreparationStep>(preparationStep)
  const submitText = preparationStep?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setCurrentPreparationStep({ ...currentPreparationStep, [name]: value })
  }

  const handleSubmit = () => {
    const newPreparationStep = { ...currentPreparationStep, preparationStepInputs: preparationStep.preparationStepInputs }
    validate(newPreparationStep) &&
    action(newPreparationStep)
  }

  const validate = (newPreparationStep: PreparationStep) => {
    const stepNumberVal = validator.validateNumber(newPreparationStep.stepNumber, 'stepNumber', /^[0-9]*$/, false)
    const minutesOfPreparationVal = validator.validateNumber(newPreparationStep.minutesOfPreparation, 'minutesOfPreparation', /^[0-9]*$/)
    const descriptionVal = validator.validateString(newPreparationStep.description, 'description', 0)

    if (stepNumberVal && descriptionVal && minutesOfPreparationVal) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <GenericForm formNeedsValidation={false} errors={errors} submitText={submitText} handleSubmit={handleSubmit}>

        <CustomInputNumber value={currentPreparationStep.stepNumber} customInputNumber={
          {
            label: 'Numero de paso', name: 'stepNumber',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese un numero válido'
          }
        } />
        <CustomInputText value={currentPreparationStep.description}
          customInputText={
            {
              label: 'Descripcion', name: 'description',
              handleChange: handleChange, pattern: '[a-zA-Z0-9\\u00E0-\\u00FC\\s?]*',
              validationMessage: 'Ingrese una descripcion valida'
            }
          } />


        <CustomInputNumber value={currentPreparationStep.minutesOfPreparation} customInputNumber={
          {
            label: 'Duracion en minutos', name: 'minutesOfPreparation',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese una duracion válida'
          }
        } />
        <h5 className='col-12 text-secondary my-1 fw-bold'>Insumos</h5>

        <PreparationStepInputFormContainer deletePreparationStepInput={deletePreparationStepInput} editPreparationStepInput={editPreparationStepInput} addPreparationStepInput={addPreparationStepInput} preparationStepInput={{} as PreparationStepInput} />
        <div className="col-12 py-3">
          {
            preparationStep.preparationStepInputs.map((x, index) => (
              <div key={index}>
                <PreparationStepInputFormContainer deletePreparationStepInput={deletePreparationStepInput} editPreparationStepInput={editPreparationStepInput} preparationStepInput={x} />
              </div>
            ))
          }
        </div>
      </GenericForm>
    </>
  )
}

export default PreparationStepForm