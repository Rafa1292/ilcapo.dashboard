import React from 'react'
import ProductRecipeForm from '../../components/productRecipes/ProductRecipeForm'
import { ProductModifier } from '../../types/ProductModifier'
import { Recipe } from '../../types/Recipe'

interface Props {
  productModifier: ProductModifier
  productId: number
  recipes: Recipe[]
}

const EditProductModifier = ({ productModifier, productId, recipes }: Props) => {
  return (
    <>
      {
        productModifier.modifierGroup !== undefined &&
        <div className='col-12 p-4 my-2'>
          <div className='p-2 rounded shadow-sm col-12 mx-2 modifierGroup-container'>
            <h4 className='modifierGroup-title'>{productModifier.modifierGroup.name}</h4>
            <div className=' modifierGroup-elementContainer'>
              {
                productModifier.modifierGroup.elements.map((element, indexModifier) => (
                  <ProductRecipeForm key={indexModifier} productId={productId} recipes={recipes} modifierElementName={element.modifierElement.name} />
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default EditProductModifier