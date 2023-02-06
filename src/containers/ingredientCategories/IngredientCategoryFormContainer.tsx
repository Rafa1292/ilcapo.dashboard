import React from 'react'
import { IngredientCategory } from '../../types/IngredientCategory'
import CreateIngredientCategory from './CreateIngredientCategory'
import EditIngredientCategory from './EditIngredientCategory'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  ingredientCategory: IngredientCategory
  addIngredientCategory: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshIngredientCategories: () => void
}

const IngredientCategoryFormContainer = ({ refreshIngredientCategories, ingredientCategory, addIngredientCategory, show, setShow }: Props) => {
  const title = ingredientCategory.id === 0 ? 'Agregar categoria' : 'Editar categoria'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addIngredientCategory}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {ingredientCategory.id === 0 ?
          <CreateIngredientCategory refreshIngredientCategories={refreshIngredientCategories} ingredientCategory={ingredientCategory} /> :
          <EditIngredientCategory refreshIngredientCategories={refreshIngredientCategories} ingredientCategory={ingredientCategory} />}
      </CustomModal>
    </>
  )
}

export default IngredientCategoryFormContainer