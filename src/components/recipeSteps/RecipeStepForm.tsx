import React, { useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputNumber from '../generics/CustomInputNumber'
import { RecipeStep } from '../../types/RecipeStep'
import RecipeStepIngredientFormContainer from '../../containers/recipeStepIngredients/RecipeStepIngredientFormContainer'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'
import * as validator from '../../utils/errorValidation'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  recipeStep: RecipeStep
  action: (recipeStep: RecipeStep) => void
  errors?: string[]
  addRecipeStepIngredient: (recipeStepIngredient: RecipeStepIngredient) => void
  editRecipeStepIngredient: (recipeStepIngredient: RecipeStepIngredient) => void
  deleteRecipeStepIngredient: (int: number) => void
}

const RecipeStepForm = ({ recipeStep, action, deleteRecipeStepIngredient, errors, addRecipeStepIngredient, editRecipeStepIngredient }: Props) => {
  const [currentRecipeStep, setCurrentRecipeStep] = useState<RecipeStep>(recipeStep)
  const submitText = recipeStep?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setCurrentRecipeStep({ ...currentRecipeStep, [name]: value })
  }

  const handleSubmit = () => {
    const newRecipeStep = { ...currentRecipeStep, recipeStepIngredients: recipeStep.recipeStepIngredients }
    validate(newRecipeStep) &&
    action(newRecipeStep)
  }

  const validate = (newRecipeStep: RecipeStep) => {
    const stepNumberVal = validator.validateNumber(newRecipeStep.stepNumber, 'stepNumber', /^[0-9]*$/, false)
    const minutesOfPreparationVal = validator.validateNumber(newRecipeStep.minutesOfPreparation, 'minutesOfPreparation', /^[0-9]*$/)
    const descriptionVal = validator.validateString(newRecipeStep.description, 'description', 0)

    if (stepNumberVal && descriptionVal && minutesOfPreparationVal) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <GenericForm formNeedsValidation={false} errors={errors} submitText={submitText} handleSubmit={handleSubmit}>

        <CustomInputNumber value={currentRecipeStep.stepNumber} customInputNumber={
          {
            label: 'Numero de paso', name: 'stepNumber',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese un numero válido'
          }
        } />
        <CustomInputText value={currentRecipeStep.description}
          customInputText={
            {
              label: 'Descripcion', name: 'description',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese una descripcion valida'
            }
          } />


        <CustomInputNumber value={currentRecipeStep.minutesOfPreparation} customInputNumber={
          {
            label: 'Duracion en minutos', name: 'minutesOfPreparation',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese una duracion válida'
          }
        } />
        <h5 className='col-12 text-secondary my-1 fw-bold'>Insumos</h5>

        <RecipeStepIngredientFormContainer deleteRecipeStepIngredient={deleteRecipeStepIngredient} editRecipeStepIngredient={editRecipeStepIngredient} addRecipeStepIngredient={addRecipeStepIngredient} recipeStepIngredient={{} as RecipeStepIngredient} />
        <div className="col-12 py-3">
          {
            recipeStep.recipeStepIngredients.map((x, index) => (
              <div key={index}>
                <RecipeStepIngredientFormContainer deleteRecipeStepIngredient={deleteRecipeStepIngredient} editRecipeStepIngredient={editRecipeStepIngredient} recipeStepIngredient={x} />
              </div>
            ))
          }
        </div>
      </GenericForm>
    </>
  )
}

export default RecipeStepForm