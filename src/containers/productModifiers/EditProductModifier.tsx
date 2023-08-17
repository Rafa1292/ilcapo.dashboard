import React, { useEffect } from 'react'
import ProductRecipeForm from '../../components/productRecipes/ProductRecipeForm'
import { ProductModifier } from '../../types/ProductModifier'
import { Recipe } from '../../types/Recipe'
import { useDelete, useGet } from '../../hooks/useAPI'
import CustomBtn from '../../components/generics/CustomBtn'
import { buttonTypes } from '../../enums/buttonTypes'

interface Props {
  productModifier: ProductModifier
  productId: number
  recipes: Recipe[]
  refreshProducts: () => void
}

const EditProductModifier = ({
  productModifier,
  productId,
  recipes,
  refreshProducts,
}: Props) => {

  const upProductModifierOrder = async (productModifierId: number) => {
    const response = await useGet<ProductModifier>(`productModifiers/upProductModifierOrder/${productModifierId}`)
    if (!response.error) {
      refreshProducts()
    }
  }

  const downProductModifierOrder = async (productModifierId: number) => {
    const response = await useGet<ProductModifier>(`productModifiers/downProductModifierOrder/${productModifierId}`)
    if (!response.error) {
      refreshProducts()
    }
  }

  const deleteProductModifier = async (productModifierId: number) => {
    const response = await useDelete<ProductModifier>(
      `productModifiers/${productModifierId}`
    )
    if (!response.error) {
      refreshProducts()
    }
  }
  return (
    <>
      {productModifier.modifierGroup !== undefined && (
        <div className='col-12 p-4 my-2'>
          <div className='p-2 rounded shadow-sm col-12 mx-2 modifierGroup-container position-relative'>
            <div className='col-12 d-flex flex-wrap'>
              <h4 className='modifierGroup-title flex-wrap d-flex'>
                <span className='mx-2'>
                  {productModifier.modifierGroup.name}
                </span>
                <CustomBtn
                  height='30px'
                  action={() => deleteProductModifier(productModifier.id)}
                  buttonType={buttonTypes.delete}
                />
              </h4>
              <div className='d-flex flex-wrap' style={{ position: 'absolute', top: '10px', right: '30px' }}>
                <CustomBtn
                  height='15px'
                  action={() => downProductModifierOrder(productModifier.id)}
                  buttonType={buttonTypes.arrowDown}
                />
                <strong className='mx-2'>
                  {productModifier.order === null ? 0 : productModifier.order}
                </strong>
                <CustomBtn
                  height='15px'
                  action={() => upProductModifierOrder(productModifier.id)}
                  buttonType={buttonTypes.arrowUp}
                />
              </div>
            </div>

            <div className=' modifierGroup-elementContainer'>
              {productModifier.modifierGroup.elements.map(
                (element, indexModifier) => (
                  <ProductRecipeForm
                    key={indexModifier}
                    productId={productId}
                    recipes={recipes}
                    modifierElementName={element.name}
                    modifierElementId={element.id}
                    defaultRecipeId={element?.defaultRecipeId}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProductModifier
