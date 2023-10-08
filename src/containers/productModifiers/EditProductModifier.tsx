import React, { useEffect, useState } from 'react'
import ProductRecipeForm from '../../components/productRecipes/ProductRecipeForm'
import { ProductModifier } from '../../types/ProductModifier'
import { Recipe } from '../../types/Recipe'
import { useDelete, useGet, usePatch } from '../../hooks/useAPI'
import CustomBtn from '../../components/generics/CustomBtn'
import { buttonTypes } from '../../enums/buttonTypes'
import CustomInputNumber from '../../components/generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'
import CustomInputCheck from '../../components/generics/CustomInputChecbox'

interface Props {
  productModifier: ProductModifier
  productId: number
  recipes: Recipe[]
  refreshProducts: () => void
}

const EditProductModifier = ({ productModifier, productId, recipes, refreshProducts }: Props) => {
  const [editProductModifier, setEditProductModifier] = useState(productModifier)

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
    const response = await useDelete<ProductModifier>(`productModifiers/${productModifierId}`)
    if (!response.error) {
      refreshProducts()
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setEditProductModifier({ ...editProductModifier, [name]: Number(value) })
  }

  const handleCheck = (event: any) => {
    const { checked } = event.target
    setEditProductModifier({ ...editProductModifier, priceByGroup: checked })
  }

  const updateProductModifier = async () => {
    console.log('updating------')
    const response = await usePatch<ProductModifier>(`productModifiers/${productModifier.id}`, editProductModifier, false)
    console.log(response)
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
                <span className='mx-2'>{productModifier.modifierGroup.name}</span>
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
                <strong className='mx-2'>{productModifier.order === null ? 0 : productModifier.order}</strong>
                <CustomBtn
                  height='15px'
                  action={() => upProductModifierOrder(productModifier.id)}
                  buttonType={buttonTypes.arrowUp}
                />
              </div>
            </div>
            <div className='col-12 d-flex flex-wrap'>
              <div className='col-12 d-flex flex-wrap'>
                <CustomInputCheck
                  value={editProductModifier.priceByGroup}
                  customInputCheck={{
                    label: 'Precio por grupo',
                    name: 'priceByGroup',
                    handleChange: handleCheck,
                    pattern: '',
                    validationMessage: '',
                  }}
                />
              </div>
              {editProductModifier.priceByGroup && (
                <div className='col-12'>
                  <CustomInputNumber
                    isRequired={false}
                    showLabel={false}
                    value={editProductModifier.price}
                    customInputNumber={{
                      label: 'Precio',
                      name: 'price',
                      handleChange: handleChange,
                      pattern: regexOptions.decimal,
                      validationMessage: 'Ingrese un precio válido',
                    }}
                  />
                </div>
              )}
              <div className='col-12'>
                <CustomInputNumber
                  isRequired={false}
                  showLabel={false}
                  value={editProductModifier.minSelect}
                  customInputNumber={{
                    label: 'Minimo seleccionable',
                    name: 'minSelect',
                    handleChange: handleChange,
                    pattern: regexOptions.decimal,
                    validationMessage: 'Ingrese un minimo válido',
                  }}
                />
              </div>
              <div className='col-12'>
                <CustomInputNumber
                  isRequired={false}
                  showLabel={false}
                  value={editProductModifier.maxSelect}
                  customInputNumber={{
                    label: 'Minimo seleccionable',
                    name: 'maxSelect',
                    handleChange: handleChange,
                    pattern: regexOptions.decimal,
                    validationMessage: 'Ingrese un maximo válido',
                  }}
                />
              </div>
              <button onClick={updateProductModifier} className='btn btn-success col-12 my-2' type='button'>
                Enviar
              </button>
            </div>

            <div className=' modifierGroup-elementContainer'>
              {productModifier.modifierGroup.elements.map((element, indexModifier) => (
                <ProductRecipeForm
                  key={indexModifier}
                  productId={productId}
                  recipes={recipes}
                  modifierElementName={element.name}
                  modifierElementId={element.id}
                  defaultRecipeId={element?.defaultRecipeId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProductModifier
