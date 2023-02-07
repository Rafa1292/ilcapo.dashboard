import React from 'react'
import { Ingredient } from '../../types/Ingredient'
import CreateIngredient from './CreateIngredient'
import EditIngredient from './EditIngredient'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  ingredient: Ingredient
  addIngredient: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshIngredients: () => void
}

const IngredientFormContainer = ({ refreshIngredients, ingredient, addIngredient, show, setShow }: Props) => {
  const title = ingredient.id === 0 ? 'Agregar ingrediente' : 'Editar ingrediente'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addIngredient}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {ingredient.id === 0 ?
          <CreateIngredient refreshIngredients={refreshIngredients} ingredient={ingredient} /> :
          <EditIngredient refreshIngredients={refreshIngredients} ingredient={ingredient} />}
      </CustomModal>
    </>
  )
}

export default IngredientFormContainer