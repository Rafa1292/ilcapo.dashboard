import { clear } from 'console'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useGet, usePatch, usePost } from '../../hooks/useAPI'
import { ProductRecipe } from '../../types/ProductRecipe'
import { Recipe } from '../../types/Recipe'
import CustomInputSelect from '../generics/CustomInputSelect'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'

interface Props {
  productId: number
  modifierElementId: number
  recipes: Recipe[]
  modifierElementName: string
  defaultRecipeId: number
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

const ProductRecipeForm = ({ productId, recipes, modifierElementName, modifierElementId, defaultRecipeId }: Props) => {
  const [currentProductRecipe, setCurrentProductRecipe] = useState<ProductRecipe>(initialProductRecipe)
  const [upgradeElementLabel, setUpgradeElementLabel] = useState<string>('')

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setCurrentProductRecipe({ ...currentProductRecipe, [name]: value })
  }

  useEffect(() => {
    setCurrentProductRecipe({ ...currentProductRecipe, productId: productId, modifierElementId: modifierElementId })
    const getProductRecipe = async () => {
      if (defaultRecipeId) {
        setCurrentProductRecipe({ ...currentProductRecipe, recipeId: defaultRecipeId })
      } else {
        const response = await useGet<ProductRecipe>(`productRecipes/${productId}/${modifierElementId}`)
        if (!response.error && response.data !== null) {
          setCurrentProductRecipe(response.data)
        }
      }
    }
    const getUpgradeElementLabel = async () => {
      const response = await useGet<ModifierElementUpgrade>(`modifierelementUpgrades/elementUpgrade/${modifierElementId}`)
      if (!response.error && response.data !== null) {
        setUpgradeElementLabel(response.data.label)
      }
    }
    getProductRecipe()
    getUpgradeElementLabel()
  }, [])

  const saveProductRecipe = async () => {
    const response = await usePost<ProductRecipe>('productRecipes', currentProductRecipe)
    if (!response.error) {
      setCurrentProductRecipe(response.data)
    }
  }

  const updateProductRecipe = async () => {
    const response = await usePatch<ProductRecipe>(`productRecipes/${currentProductRecipe.id}`, currentProductRecipe)
    if (!response.error) {
      Swal.fire('El cambio se realizo exitosamente', response.message.toString(), 'success')

    }
  }
  return (
    <>
      <div className='d-flex flex-wrap align-items-center'>
        <label className='p-2 col-4 d-flex flex-wrap'>
          {modifierElementName}
          <small className='col-12 text-left px-1 text-success'>{upgradeElementLabel}</small>
        </label>
        <div className='col-5'>
          <CustomInputSelect showLabel={false} value={currentProductRecipe?.recipeId}
            customInputSelect={
              {
                label: 'Receta', name: 'recipeId',
                handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una receta'
              }}
            data={recipes.map(recipe => { return { value: recipe?.id, label: recipe.name } })}
            defaultLegend={'Recetas...'}
          />
        </div>
        <div className="col-3">
          {
            defaultRecipeId === 0 &&
            <>
              {
                currentProductRecipe.id > 0 ?
                  <Button onClick={updateProductRecipe} variant={'secondary'} className='m-2 col-10'>
                    Editar
                  </Button>
                  :
                  <Button onClick={saveProductRecipe} variant={'success'} className='m-2 col-10'>
                    Agregar
                  </Button>
              }
            </>
          }
        </div>
      </div></>
  )
}

export default ProductRecipeForm