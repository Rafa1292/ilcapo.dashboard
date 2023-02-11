import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import PreparationStepForm from '../../components/preparationSteps/PreparationStepForm'
import { useDelete } from '../../hooks/useAPI'
import { Ingredient } from '../../types/Ingredient'
import { PreparationStep } from '../../types/PreparationStep'
import CreatePreparationStep from '../preparationStep/CreatePreparationStep'

interface Props {
  id: number
  ingredient: Ingredient
}

const initialPreparationStep: PreparationStep = {
  id: 0,
  description: '',
  ingredientId: 0,
  cost: 0,
  minutesOfPreparation: 0,
  stepNumber: 0,
  delete: false,
  preparationStepInputs: [],
}
const IngredientPreparation = ({ id }: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const [preparationStep, setPreparationStep] = useState<PreparationStep>(initialPreparationStep)

  const refreshPreparationSteps = () => {
    console.log('refreshPreparationSteps')
  }
  return (
    <>
      <Button variant={'outline-success'} className='m-2' onClick={(() => setShow(true))}>
        Preparacion
      </Button>
      <CustomModal title='Agregar preparacion' show={show} handleClose={(() => setShow(false))}>
        {/* create preparation step */}
        <CreatePreparationStep preparationStep={preparationStep} refreshPreparationSteps={refreshPreparationSteps}/>
        {/* edit each preparation step existing */}
      </CustomModal>
    </>
  )
}

export default IngredientPreparation