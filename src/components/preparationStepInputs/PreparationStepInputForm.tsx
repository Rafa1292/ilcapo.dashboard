import React, { useEffect, useState } from 'react'
import { useGetList } from '../../hooks/useAPI'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputNumber from '../generics/CustomInputNumber'
import { InputCategory } from '../../types/InputCategory'
import { Measure } from '../../types/Measure'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import CustomBtn from '../generics/CustomBtn'
import { buttonTypes } from '../../enums/buttonTypes'
import * as validator from '../../utils/errorValidation'
import { Input } from '../../types/Input'
import { Magnitude } from '../../types/Magnitude'

interface Props {
  currentPreparationStepInput: PreparationStepInput
  action?: (preparationStepInput: PreparationStepInput) => void
  errors?: string[]
  cancelAction?: () => void
}

const PreparationStepInputForm = ({ currentPreparationStepInput, errors, action, cancelAction }: Props) => {
  const [preparationStepInput, setPreparationStepInput] = useState<PreparationStepInput>(currentPreparationStepInput)
  const [magnitudes, setMagnitudes] = useState<Magnitude[]>([])
  const [magnitude, setMagnitude] = useState<Magnitude>()
  const [inputCategories, setInputCategories] = useState<InputCategory[]>([])
  const [inputCategory, setInputCategory] = useState<InputCategory>()

  const setInitialInputCategory = (tmpInputCategories: InputCategory[]) => {
    const tmpInputCategory = tmpInputCategories.find(inputCategory => inputCategory.id === currentPreparationStepInput.input.inputCategoryId)
    setInputCategory(tmpInputCategory)
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    const val = value === '' ? '' : parseInt(value)
    setPreparationStepInput({ ...preparationStepInput, [name]: val })
  }

  const handleInput = (event: any) => {
    const { value } = event.target
    if (inputCategory?.inputs) {
      const tmpInput = inputCategory?.inputs.find(input => input.id === parseInt(value))
      tmpInput && setPreparationStepInput({ ...preparationStepInput, input: tmpInput, inputId: tmpInput.id })
    }
  }

  const handleMeasure = (event: any) => {
    const { value } = event.target
    const tmpMeasure = magnitude?.measures.find(measure => measure.id === parseInt(value))
    tmpMeasure && setPreparationStepInput({ ...preparationStepInput, measure: tmpMeasure, measureId: tmpMeasure.id })
  }

  const handleCategoryChange = (event: any) => {
    const { value } = event.target
    setPreparationStepInput({ ...preparationStepInput, input: { inputCategoryId: parseInt(value) } as Input, inputId: 0 })
    setInputCategory(inputCategories.find(inputCategory => inputCategory.id === parseInt(value)))
  }

  const handleChangeMagnitude = (event: any) => {
    const { value } = event.target
    setPreparationStepInput({ ...preparationStepInput, measure: { magnitudeId: parseInt(value) } as Measure, measureId: 0 })
    setMagnitude(magnitudes.find(magnitude => magnitude.id === parseInt(value)))
  }

  const handleSubmit = () => {
    if (validate() && action) {
      action(preparationStepInput)
      resetPreparationStepInput()
    }
  }

  const setUniqueId = () => {
    if (preparationStepInput.id === 0) {
      setPreparationStepInput({ ...preparationStepInput, id: new Date(Date.now()).valueOf() })
    }
  }

  const validate = () => {
    const quantityVal = validator.validateNumber(preparationStepInput.quantity, 'quantity', /^[0-9]*$/, false)
    const inputCategoryVal = validator.validateNumber(preparationStepInput.input.inputCategoryId, 'inputCategoryId', /^[1-9]*$/)
    const measureVal = validator.validateNumber(preparationStepInput.measureId, 'measureId', /^[1-9]*$/)
    const inputVal = validator.validateNumber(preparationStepInput.inputId, 'inputId', /^[1-9]*$/)

    if (quantityVal && measureVal && inputVal && inputCategoryVal) {
      return true
    } else {
      return false
    }
  }

  const resetPreparationStepInput = () => {
    if (cancelAction) {
      cancelAction()
    }
    else {
      setPreparationStepInput({ ...currentPreparationStepInput, measure: { magnitudeId: 0} as Measure, id: new Date(Date.now()).valueOf() })
      setInputCategory(undefined)
      setMagnitude(undefined)
    }
  }

  useEffect(() => {
    const getMagnitudes = async () => {
      const response = await useGetList<Magnitude[]>('magnitudes')
      if (!response.error) {
        setMagnitudes(response.data)
      }
    }
    const getInputCategories = async () => {
      const response = await useGetList<InputCategory[]>('inputCategories')
      if (!response.error) {
        setInputCategories(response.data)
        setInitialInputCategory(response.data)
      }
    }
    getMagnitudes()
    getInputCategories()
    setUniqueId()
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap col-12 p-0'>
        {
          errors &&
          <div className="col-12 d-flex justify-content-center">
            <ul className="list-group list-group-flush">
              {
                errors.map((error, index) => (
                  <li key={index} className="list-group-item text-danger">{error}</li>
                ))
              }
            </ul>
          </div>
        }
        <div className="col-2 p-1">
          <CustomInputNumber showLabel={false} value={preparationStepInput.quantity} customInputNumber={
            {
              label: 'Cantidad', name: 'quantity',
              handleChange: handleChange, pattern: '[0-9]*', validationMessage: 'Ingrese una cantidad válida'
            }
          } />
        </div>
        <div className="col-2 p-1">
          <CustomInputSelect showLabel={false} value={preparationStepInput.measure.magnitudeId}
            customInputSelect={
              {
                label: 'Magnitud', name: 'measureId',
                handleChange: handleChangeMagnitude, pattern: '', validationMessage: 'Seleccione una magnitud'
              }}
            data={magnitudes.map(magnitud => { return { value: magnitud.id, label: magnitud.name } })}
            defaultLegend={'Magnitud'}
          />
        </div>

        {
          magnitude?.measures &&
          <div className="col-2 p-1">
            <CustomInputSelect showLabel={false} value={preparationStepInput.measureId}
              customInputSelect={
                {
                  label: 'Medida', name: 'measureId',
                  handleChange: handleMeasure, pattern: '', validationMessage: 'Seleccione una medida'
                }}
              data={magnitude.measures.map(measure => { return { value: measure.id, label: measure.name } })}
              defaultLegend={'Seleccione una medida'}
            />
          </div>
        }

        <div className="col-3 p-1">
          <CustomInputSelect showLabel={false} value={preparationStepInput.input?.inputCategoryId}
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
          inputCategory &&
          <div className="col-2 p-1">
            <CustomInputSelect showLabel={false} value={preparationStepInput.inputId}
              customInputSelect={
                {
                  label: 'Insumo', name: 'inputId',
                  handleChange: handleInput, pattern: '', validationMessage: 'Seleccione un insumo'
                }}
              data={inputCategory.inputs ? inputCategory.inputs.map(input => { return { value: input.id, label: input.name } }) : []}
              defaultLegend={'Insumo'}
            />
          </div>
        }
        <div className="py-3 px-1 d-flex justify-content-center">
          <CustomBtn height='30px' buttonType={buttonTypes.success} action={handleSubmit} />
        </div>
        <div className="py-3 px-1 d-flex justify-content-center">
          <CustomBtn height='30px' buttonType={buttonTypes.cancel} action={resetPreparationStepInput} />
        </div>
      </div>
    </>
  )
}

export default PreparationStepInputForm