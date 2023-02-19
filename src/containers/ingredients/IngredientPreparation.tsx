import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomBtn from '../../components/generics/CustomBtn'
import CustomModal from '../../components/generics/CustomModal'
import { buttonTypes } from '../../enums/buttonTypes'
import { Ingredient } from '../../types/Ingredient'
import { PreparationStep } from '../../types/PreparationStep'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import CreatePreparationStep from '../preparationStep/CreatePreparationStep'
import EditPreparationStep from '../preparationStep/EditPreparationStep'
import '../../scss/ingredientPreparation.scss'

const initialPreparationStep: PreparationStep = {
  id: 0,
  description: '',
  ingredientId: 0,
  cost: 0,
  minutesOfPreparation: 0,
  stepNumber: 0,
  delete: false,
  preparationStepInputs: [],
  createdBy: 0,
  updatedBy: 0
}

interface Props {
  ingredient: Ingredient
  refreshIngredients: () => void
}

const IngredientPreparation = ({ ingredient, refreshIngredients }: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const [preparationStep, setPreparationStep] = useState<PreparationStep>(initialPreparationStep)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showForm, setShowForm] = useState<boolean>(false)

  const addPreparationStepInput = (preparationStepInput: PreparationStepInput) => {
    setPreparationStep({
      ...preparationStep,
      preparationStepInputs: [...preparationStep.preparationStepInputs, preparationStepInput]
    })
  }

  const editPreparationStepInput = (preparationStepInput: PreparationStepInput) => {
    const tmpInputs = preparationStep.preparationStepInputs.filter(input => input.id !== preparationStepInput.id)
    setPreparationStep({ ...preparationStep, preparationStepInputs: [...tmpInputs, preparationStepInput] })
  }

  const deletePreparationStepInput = (id: number) => {
    const tmpInputs = preparationStep.preparationStepInputs.filter(input => input.id !== id)
    setPreparationStep({ ...preparationStep, preparationStepInputs: [...tmpInputs] })
    refreshIngredients()
  }
  

  const refreshingIngredient = async () => {
    setIsLoading(true)
    setPreparationStep({ ...initialPreparationStep, ingredientId: ingredient.id })
    await refreshIngredients()
    setIsLoading(false)
  }

  useEffect(() => {
    setPreparationStep({ ...preparationStep, ingredientId: ingredient.id })
  }, [])

  return (
    <>
      <Button variant={'outline-success'} className='m-2' onClick={(() => setShow(true))}>
        Preparacion
      </Button>
      <CustomModal title='Agregar preparacion' show={show} handleClose={(() => setShow(false))}>
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
            <CreatePreparationStep deletePreparationStepInput={deletePreparationStepInput} editPreparationStepInput={editPreparationStepInput}
              preparationStep={preparationStep} addPreparationStepInput={addPreparationStepInput} refreshIngredient={refreshingIngredient} />
          }
        </div>

        {ingredient.preparationSteps.sort(function (a, b) { return a.stepNumber - b.stepNumber }).map((preparationStep, index) => (
          <div className='col-12' key={index}>
            <EditPreparationStep preparationStep={preparationStep} refreshIngredient={refreshingIngredient}
            />
          </div>
        ))}
      </CustomModal>
    </>
  )
}

export default IngredientPreparation