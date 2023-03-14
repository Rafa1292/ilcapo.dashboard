import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ProductRecipe } from '../../types/ProductRecipe'
import { Recipe } from '../../types/Recipe'
import CustomInputSelect from '../generics/CustomInputSelect'

interface Props {
  productId: number
  recipes: Recipe[]
  modifierElementName: string
}

const initialProductRecipe: ProductRecipe = {
  id: 0,
  productId: 0,
  recipeId: 0,
  modifierElementId: 0,
  delete: false,
  createdBy: 0,
  updatedBy: 0
}

const ProductRecipeForm = ({productId, recipes, modifierElementName}: Props) => {
  const [currentProductRecipe, setCurrentProductRecipe] = useState<ProductRecipe>({ ...initialProductRecipe, productId: productId })

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setCurrentProductRecipe({ ...currentProductRecipe, [name]: value })
  }

  return (
    <>
      <div className='d-flex flex-wrap align-items-center'>
        <label className='p-2 col-4 '>{modifierElementName}</label>
        <div className='col-5'>
          <CustomInputSelect showLabel={false} value={currentProductRecipe.recipeId}
            customInputSelect={
              {
                label: 'Receta', name: 'recipeId',
                handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una receta'
              }}
            data={recipes.map(recipe => { return { value: recipe.id, label: recipe.name } })}
            defaultLegend={'Recetas...'}
          />
        </div>
        <div className="col-3">
          {
            currentProductRecipe.recipeId === 0
            &&
            <Button variant={'success'} className='m-2 col-10'>
              Agregar
            </Button>
            ||
            <Button variant={'secondary'} className='m-2 col-10'>
              Editar
            </Button>
          }
        </div>
      </div></>
  )
}

export default ProductRecipeForm