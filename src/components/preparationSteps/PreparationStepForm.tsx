import React, { useEffect, useState } from 'react'
import { useGetList } from '../../hooks/useAPI'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputNumber from '../generics/CustomInputNumber'
import { InputCategory } from '../../types/InputCategory'
import { Measure } from '../../types/Measure'
import { Input } from '../../types/Input'
import { PreparationStep } from '../../types/PreparationStep'
import PreparationStepInputFormContainer from '../../containers/preparationStepInputs/PreparationStepInputFormContainer'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import * as validate from '../../utils/errorValidation'
interface Props {
  preparationStep: PreparationStep
  action: (preparationStep: PreparationStep) => void
  errors?: string[]
  addPreparationStepInput: (preparationStepInput: PreparationStepInput) => void
}

const InputForm = ({ preparationStep, action, errors, addPreparationStepInput }: Props) => {
  const [input, setInput] = useState<PreparationStep>(preparationStep)
  const [measures, setMeasures] = useState<Measure[]>([])
  const [inputCategories, setInputCategories] = useState<InputCategory[]>([])
  const [inputCategory, setInputCategory] = useState<InputCategory>()
  const submitText = preparationStep?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }



  const handleSubmit = () => {
    action(input)
  }

  useEffect(() => {
    const getMeasures = async () => {
      const response = await useGetList<Measure[]>('measures')
      if (!response.error) {
        setMeasures(response.data)
      }
    }
    const getInputCategories = async () => {
      const response = await useGetList<InputCategory[]>('inputCategories')
      if (!response.error) {
        setInputCategories(response.data)
      }
    }
    getMeasures()
    getInputCategories()
  }, [])

  return (
    <>
      <GenericForm formNeedsValidation={false} errors={errors} submitText={submitText} handleSubmit={handleSubmit}>

        <CustomInputNumber value={input.stepNumber} customInputNumber={
          {
            label: 'Numero de paso', name: 'stepNumber',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese un numero válido'
          }
        } />
        <CustomInputText value={input.description}
          customInputText={
            {
              label: 'Descripcion', name: 'description',
              handleChange: handleChange, pattern: '[a-zA-Z0-9\\u00E0-\\u00FC\\s?]*',
              validationMessage: 'Ingrese una descripcion valida'
            }
          } />


        <CustomInputNumber value={input.minutesOfPreparation} customInputNumber={
          {
            label: 'Duracion en minutos', name: 'minutesOfPreparation',
            handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese una duracion válida'
          }
        } />
        <PreparationStepInputFormContainer addPreparationStepInput={addPreparationStepInput} preparationStepInput={{} as PreparationStepInput} />
        {
          input.preparationStepInputs.map(x => (
            <div key={x.id}>
              <PreparationStepInputFormContainer  preparationStepInput={x} />
            </div>
          ))
        }




      </GenericForm>
    </>
  )
}

export default InputForm