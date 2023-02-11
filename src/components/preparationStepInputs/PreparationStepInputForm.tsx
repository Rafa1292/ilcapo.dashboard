import React, { useEffect, useState } from 'react'
import { useGetList } from '../../hooks/useAPI'
import GenericForm from '../generics/GenericForm'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputNumber from '../generics/CustomInputNumber'
import { InputCategory } from '../../types/InputCategory'
import { Measure } from '../../types/Measure'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import CustomBtn from '../generics/CustomBtn'
import { buttonTypes } from '../../enums/buttonTypes'
import * as validator from '../../utils/errorValidation'

interface Props {
  currentPreparationStepInput: PreparationStepInput
  action?: (preparationStepInput: PreparationStepInput) => void
  errors?: string[]
}

const PreparationStepInputForm = ({ currentPreparationStepInput, errors, action }: Props) => {
  const [preparationStepInput, setPreparationStepInput] = useState<PreparationStepInput>(currentPreparationStepInput)
  const [measures, setMeasures] = useState<Measure[]>([])
  const [inputCategories, setInputCategories] = useState<InputCategory[]>([])
  const [inputCategory, setInputCategory] = useState<InputCategory>()
  const [inputCategoryId, setInputCategoryId] = useState<number>(currentPreparationStepInput.input?.inputCategoryId ? currentPreparationStepInput.input.inputCategoryId : 0)


  const handleChange = (event: any) => {
    const { name, value } = event.target
    const val = value === '' ? '' : parseInt(value)
    setPreparationStepInput({ ...preparationStepInput, [name]: val })
  }

  const handleCategoryChange = (event: any) => {
    const { value } = event.target
    setInputCategoryId(parseInt(value))
    setInputCategory(inputCategories.find(inputCategory => inputCategory.id === parseInt(value)))
  }

  const handleSubmit = () => {
    validate() && action && action(preparationStepInput)
  }

  const validate = () => {
    const quantityVal = validator.validateNumber(preparationStepInput.quantity, 'quantity', /^[1-9]*$/)
    const inputCategoryVal = validator.validateNumber(inputCategoryId, 'inputCategoryId', /^[1-9]*$/)
    const measureVal = validator.validateNumber(preparationStepInput.measureId, 'measureId', /^[1-9]*$/)
    const inputVal = validator.validateNumber(preparationStepInput.inputId, 'inputId', /^[1-9]*$/)

    if (quantityVal && measureVal && inputVal && inputCategoryVal) {
      return true
    } else {
      return false
    }
  }

  const initializeInputCategoryId = () => {
    if(currentPreparationStepInput.inputId){
      const tmpCategory = inputCategories.find(inputCategory => inputCategory.inputs?.find(x => x.id === currentPreparationStepInput.inputId) !== undefined)

      if(tmpCategory){
        setInputCategoryId(tmpCategory.id)
        setInputCategory(tmpCategory)
      }
    }
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
    initializeInputCategoryId()
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap col-12 p-0'>
        <h5 className='col-12 text-secondary my-1 fw-bold'>Insumos</h5>
        <div className="col-2 p-1">
          <CustomInputNumber showLabel={false} value={preparationStepInput.quantity} customInputNumber={
            {
              label: 'Cantidad', name: 'quantity',
              handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese una cantidad válida'
            }
          } />
        </div>
        <div className="col-3 p-1">
          <CustomInputSelect showLabel={false} value={preparationStepInput.measureId}
            customInputSelect={
              {
                label: 'Medida', name: 'measureId',
                handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una medida'
              }}
            data={measures.map(measure => { return { value: measure.id, label: measure.name } })}
            defaultLegend={'Medida'}
          />
        </div>

        <div className="col-3 p-1">
          <CustomInputSelect showLabel={false} value={inputCategoryId}
            customInputSelect={
              {
                label: 'Categoria', name: 'inputCategoryId',
                handleChange: handleCategoryChange, pattern: '', validationMessage: 'Seleccione una categoria'
              }}
            data={inputCategories.map(inputCategory => { return { value: inputCategory.id, label: inputCategory.name } })}
            defaultLegend={'Categoria'}
          />
        </div>

        {
          inputCategory?.inputs &&
          <div className="col-2 p-1">
            <CustomInputSelect showLabel={false} value={preparationStepInput.inputId}
              customInputSelect={
                {
                  label: 'Insumo', name: 'inputId',
                  handleChange: handleChange, pattern: '', validationMessage: 'Seleccione un insumo'
                }}
              data={inputCategory.inputs.map(input => { return { value: input.id, label: input.name } })}
              defaultLegend={'Insumo'}
            />
          </div>
        }
        <div className="py-3 px-1 d-flex justify-content-center">
          <CustomBtn height='30px' buttonType={buttonTypes.success} action={handleSubmit} />
        </div>
        <div className="py-3 px-1 d-flex justify-content-center">
          <CustomBtn height='30px' buttonType={buttonTypes.cancel} />
        </div>
      </div>
    </>
  )
}

export default PreparationStepInputForm