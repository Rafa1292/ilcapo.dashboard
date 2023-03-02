import React, { useEffect, useState } from 'react'
import { useGetList } from '../../hooks/useAPI'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputNumber from '../generics/CustomInputNumber'
import { IngredientCategory } from '../../types/IngredientCategory'
import { Measure } from '../../types/Measure'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'
import CustomBtn from '../generics/CustomBtn'
import { buttonTypes } from '../../enums/buttonTypes'
import * as validator from '../../utils/errorValidation'
import { Ingredient } from '../../types/Ingredient'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { Magnitude } from '../../types/Magnitude'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentRecipeStepIngredient: RecipeStepIngredient
  action?: (recipeStepIngredient: RecipeStepIngredient) => void
  errors?: string[]
  cancelAction?: () => void
}

const RecipeStepIngredientForm = ({ currentRecipeStepIngredient, errors, action, cancelAction }: Props) => {
  const [recipeStepIngredient, setRecipeStepIngredient] = useState<RecipeStepIngredient>(currentRecipeStepIngredient)
  const [magnitudes, setMagnitudes] = useState<Magnitude[]>([])
  const [magnitude, setMagnitude] = useState<Magnitude>()  
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([])
  const [ingredientCategory, setIngredientCategory] = useState<IngredientCategory>()

  const setInitialIngredientCategory = (tmpIngredientCategories: IngredientCategory[]) => {
    const tmpIngredientCategory = tmpIngredientCategories.find(ingredientCategory => ingredientCategory.ingredients?.find(ingredient => ingredient.id === currentRecipeStepIngredient.ingredientId))
    setRecipeStepIngredient({ ...recipeStepIngredient, ingredient: { ingredientCategoryId: tmpIngredientCategory?.id } as Ingredient, ingredientId: currentRecipeStepIngredient.ingredientId })
    setIngredientCategory(tmpIngredientCategory)
  }

  const handleChangeMagnitude = (event: any) => {
    const { value } = event.target
    setRecipeStepIngredient({ ...recipeStepIngredient, measure: { magnitudeId: parseInt(value) } as Measure, measureId: 0 })
    setMagnitude(magnitudes.find(magnitude => magnitude.id === parseInt(value)))
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    const val = value === '' ? '' : parseInt(value)
    setRecipeStepIngredient({ ...recipeStepIngredient, [name]: val })
  }

  const handleInput = (event: any) => {
    const { value } = event.target
    if (ingredientCategory?.ingredients) {
      const tmpIngredient = ingredientCategory?.ingredients.find(ingredient => ingredient.id === parseInt(value))
      tmpIngredient && setRecipeStepIngredient({ ...recipeStepIngredient, ingredient: tmpIngredient, ingredientId: tmpIngredient.id })
    }
  }

  const handleMeasure = (event: any) => {
    const { value } = event.target
    const tmpMeasure = magnitude?.measures.find(measure => measure.id === parseInt(value))
    tmpMeasure && setRecipeStepIngredient({ ...recipeStepIngredient, measure: tmpMeasure, measureId: tmpMeasure.id })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setRecipeStepIngredient({ ...recipeStepIngredient, [name]: checked })
  }

  const handleCategoryChange = (event: any) => {
    const { value } = event.target
    setRecipeStepIngredient({ ...recipeStepIngredient, ingredient: { ingredientCategoryId: parseInt(value) } as Ingredient, ingredientId: 0 })
    setIngredientCategory(ingredientCategories.find(ingredientCategory => ingredientCategory.id === parseInt(value)))
  }

  const handleSubmit = () => {
    if (validate() && action) {
      action(recipeStepIngredient)
      resetRecipeStepIngredient()
    }
  }

  const setUniqueId = () => {
    if (recipeStepIngredient.id === 0) {
      setRecipeStepIngredient({ ...recipeStepIngredient, id: new Date(Date.now()).valueOf() })
    }
  }

  const validate = () => {
    const quantityVal = validator.validateNumber(recipeStepIngredient.quantity, 'quantity', /^[0-9]*$/, false)
    const ingredientCategoryVal = validator.validateNumber(recipeStepIngredient.ingredient.ingredientCategoryId, 'ingredientCategoryId', /^[1-9]*$/)
    const measureVal = validator.validateNumber(recipeStepIngredient.measureId, 'measureId', /^[1-9]*$/)
    const ingredientVal = validator.validateNumber(recipeStepIngredient.ingredientId, 'ingredientId', /^[1-9]*$/)

    if (quantityVal && measureVal && ingredientVal && ingredientCategoryVal) {
      return true
    } else {
      return false
    }
  }

  const resetRecipeStepIngredient = () => {
    if (cancelAction) {
      cancelAction()
    }
    else {
      setRecipeStepIngredient({ ...currentRecipeStepIngredient, measure: { magnitudeId: 0} as Measure, id: new Date(Date.now()).valueOf() })
      setIngredientCategory(undefined)
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
    const getIngredientCategories = async () => {
      const response = await useGetList<IngredientCategory[]>('ingredientCategories')
      if (!response.error) {
        setIngredientCategories(response.data)
        setInitialIngredientCategory(response.data)
      }
    }
    getMagnitudes()
    getIngredientCategories()
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
        <div className="col-1 py-1">
          <CustomInputNumber showLabel={false} value={recipeStepIngredient.quantity} customInputNumber={
            {
              label: 'Cantidad', name: 'quantity',
              handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese una cantidad válida'
            }
          } />
        </div>
        <div className="col-2 p-1">
          <CustomInputSelect showLabel={false} value={recipeStepIngredient.measure.magnitudeId}
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
            <CustomInputSelect showLabel={false} value={recipeStepIngredient.measureId}
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

        <div className="col-2 p-1">
          <CustomInputSelect showLabel={false} value={recipeStepIngredient.ingredient?.ingredientCategoryId}
            customInputSelect={
              {
                label: 'Categoria', name: 'ingredientCategoryId',
                handleChange: handleCategoryChange, pattern: '', validationMessage: 'Seleccione una categoria'
              }}
            data={ingredientCategories.map(ingredientCategory => { return { value: ingredientCategory.id, label: ingredientCategory.name } })}
            defaultLegend={'Categoria'}
          />
        </div>

        {
          ingredientCategory &&
          <div className="col-2 p-1">
            <CustomInputSelect showLabel={false} value={recipeStepIngredient.ingredientId}
              customInputSelect={
                {
                  label: 'Ingrediente', name: 'ingredientId',
                  handleChange: handleInput, pattern: '', validationMessage: 'Seleccione un ingrediente'
                }}
              data={ingredientCategory.ingredients ? ingredientCategory.ingredients.map(ingredient => { return { value: ingredient.id, label: ingredient.name } }) : []}
              defaultLegend={'Ingrediente'}
            />
          </div>
        }
        <div className="col-1 p-1 d-flex align-items-center">
          <CustomInputCheck value={recipeStepIngredient.isOptional} customInputCheck={
            {
              label: 'Opcional', name: 'optional',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />
        </div>
        <div className="col-1 p-1 d-flex align-items-center">
          <CustomInputCheck value={recipeStepIngredient.extra} customInputCheck={
            {
              label: 'Extra', name: 'extra',
              handleChange: handleCheck, pattern: '', validationMessage: ''
            }
          } />
        </div>

        <div className="py-3 px-1 d-flex justify-content-center">
          <CustomBtn height='30px' buttonType={buttonTypes.success} action={handleSubmit} />
        </div>
        <div className="py-3 px-1 d-flex justify-content-center">
          <CustomBtn height='30px' buttonType={buttonTypes.cancel} action={resetRecipeStepIngredient} />
        </div>
      </div>
    </>
  )
}

export default RecipeStepIngredientForm