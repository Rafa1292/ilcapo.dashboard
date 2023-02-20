import React from 'react'
import { Recipe } from '../../types/Recipe'
import CreateRecipe from './CreateRecipe'
import EditRecipe from './EditRecipe'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  recipe: Recipe
  addRecipe: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshRecipes: () => void
}

const RecipeFormContainer = ({ refreshRecipes, recipe, addRecipe, show, setShow }: Props) => {
  const title = recipe.id === 0 ? 'Agregar receta' : 'Editar receta'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addRecipe}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {recipe.id === 0 ?
          <CreateRecipe refreshRecipes={refreshRecipes} recipe={recipe} /> :
          <EditRecipe refreshRecipes={refreshRecipes} recipe={recipe} />}
      </CustomModal>
    </>
  )
}

export default RecipeFormContainer