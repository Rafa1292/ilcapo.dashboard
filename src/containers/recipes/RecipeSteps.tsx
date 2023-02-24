import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomBtn from '../../components/generics/CustomBtn'
import CustomModal from '../../components/generics/CustomModal'
import { buttonTypes } from '../../enums/buttonTypes'
import { Recipe } from '../../types/Recipe'
import { RecipeStep } from '../../types/RecipeStep'
import { RecipeStepIngredient } from '../../types/RecipeStepIngredient'
import CreateRecipeStep from '../recipeSteps/CreateRecipeStep'
import EditRecipeStep from '../recipeSteps/EditRecipeStep'
import '../../scss/ingredientPreparation.scss'

const initialRecipeStep: RecipeStep = {
  id: 0,
  description: '',
  recipeId: 0,
  cost: 0,
  minutesOfPreparation: 0,
  stepNumber: 0,
  delete: false,
  recipeStepIngredients: [],
  createdBy: 0,
  updatedBy: 0
}

interface Props {
  recipe: Recipe
  refreshRecipes: () => void
}

const RecipeSteps = ({ recipe, refreshRecipes }: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const [recipeStep, setRecipeStep] = useState<RecipeStep>(initialRecipeStep)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const addRecipeStepIngredient = (recipeStepIngredient: RecipeStepIngredient) => {
    setRecipeStep({
      ...recipeStep,
      recipeStepIngredients: [...recipeStep.recipeStepIngredients, recipeStepIngredient]
    })
  }

  const editRecipeStepIngredient = (recipeStepIngredient: RecipeStepIngredient) => {
    const tmpIngredients = recipeStep.recipeStepIngredients.filter(ingredient => ingredient.id !== recipeStepIngredient.id)
    setRecipeStep({ ...recipeStep, recipeStepIngredients: [...tmpIngredients, recipeStepIngredient] })
  }

  const deleteRecipeStepIngredient = (id: number) => {
    const tmpIngredients = recipeStep.recipeStepIngredients.filter(ingredient => ingredient.id !== id)
    setRecipeStep({ ...recipeStep, recipeStepIngredients: [...tmpIngredients] })
    refreshRecipes()
  }


  const refreshingRecipeStep = async () => {
    setIsLoading(true)
    setRecipeStep({ ...initialRecipeStep, recipeId: recipe.id })
    await refreshRecipes()
    setIsLoading(false)
  }

  useEffect(() => {
    setRecipeStep({ ...recipeStep, recipeId: recipe.id })
  }, [])

  return (
    <>
      <Button variant={'outline-success'} className='m-2' onClick={(() => setShow(true))}>
        Receta
      </Button>
      <CustomModal title='Agregar receta' show={show} handleClose={(() => setShow(false))}>
        <div className="col-12 d-flex flex-wrap justify-content-center">
          {
            showForm
            &&
            <CustomBtn buttonType={buttonTypes.cancel} height='50px' action={(() => setShowForm(false))} />
            ||
            <button className='btn btn-outline-secondary' onClick={(() => setShowForm(!showForm))}>
              Agregar paso
            </button>
          }
        </div>
        <div className={`col-12 step-form_container ${!showForm ? '' : 'step-form_containerOpen'}`}>
          {
            !isLoading &&
            <CreateRecipeStep deleteRecipeStepIngredient={deleteRecipeStepIngredient} editRecipeStepIngredient={editRecipeStepIngredient}
              recipeStep={recipeStep} addRecipeStepIngredient={addRecipeStepIngredient} refreshRecipe={refreshingRecipeStep} />
          }
        </div>

        {recipe.recipeSteps.sort(function (a, b) { return a.stepNumber - b.stepNumber }).map((recipeStep, index) => (
          <div className='col-12' key={index}>
            <EditRecipeStep recipeStep={recipeStep} refreshRecipe={refreshingRecipeStep}
            />
          </div>
        ))}
      </CustomModal>
    </>
  )
}

export default RecipeSteps