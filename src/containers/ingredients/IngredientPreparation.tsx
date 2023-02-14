import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { Ingredient } from '../../types/Ingredient'
import { PreparationStep } from '../../types/PreparationStep'
import { PreparationStepInput } from '../../types/PreparationStepInput'
import CreatePreparationStep from '../preparationStep/CreatePreparationStep'

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
  refreshIngredient: (id: number) => void
}

const IngredientPreparation = ({ ingredient, refreshIngredient }: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const [preparationStep, setPreparationStep] = useState<PreparationStep>(initialPreparationStep)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addPreparationStepInput = (preparationStepInput: PreparationStepInput) => {
    setPreparationStep({ ...preparationStep, preparationStepInputs: [...preparationStep.preparationStepInputs, preparationStepInput] })
  }

  const editPreparationStepInput = (preparationStepInput: PreparationStepInput) => {
    const tmpInputs = preparationStep.preparationStepInputs.filter(input => input.id !== preparationStepInput.id)
    setPreparationStep({ ...preparationStep, preparationStepInputs: [...tmpInputs, preparationStepInput] })
  }

  const deletePreparationStepInput = (id: number) => {
    const tmpInputs = preparationStep.preparationStepInputs.filter(input => input.id !== id)
    setPreparationStep({ ...preparationStep, preparationStepInputs: [...tmpInputs] })
  }

  const refreshingIngredient = async (id: number) => {
    setIsLoading(true)
    await refreshIngredient(id)
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
        {
          !isLoading &&
            <CreatePreparationStep deletePreparationStepInput={deletePreparationStepInput} editPreparationStepInput={editPreparationStepInput}
              preparationStep={preparationStep} addPreparationStepInput={addPreparationStepInput} refreshIngredient={refreshingIngredient} />
        }

        {ingredient.preparationSteps.map((preparationStep, index) => (
          <div className='col-12' key={index}>
            <CreatePreparationStep deletePreparationStepInput={deletePreparationStepInput} editPreparationStepInput={editPreparationStepInput}
              preparationStep={preparationStep} addPreparationStepInput={addPreparationStepInput} refreshIngredient={refreshingIngredient}
            />
          </div>
        ))}
      </CustomModal>
    </>
  )
}

export default IngredientPreparation