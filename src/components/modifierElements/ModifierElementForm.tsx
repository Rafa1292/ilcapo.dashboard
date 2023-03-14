import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import { ModifierElement } from '../../types/ModifierElement'
import CustomInputNumber from '../generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'
import { Recipe } from '../../types/Recipe'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { ModifierGroup } from '../../types/ModifierGroup'
import { Product } from '../../types/Product'
import { ProductReference } from '../../types/ProductReference'

interface Props {
  currentModifierElement: ModifierElement
  action: (modifierElement: ModifierElement) => void
  errors?: string[]
  modifierGroups: ModifierGroup[]
}

const initialProductReference: ProductReference = 
  {
    id:0,
    productId: 0,
    modifierElementId: 0,
    createdBy: 1,
    updatedBy: 1
  }


const ModifierElementForm = ({ currentModifierElement, modifierGroups, action, errors }: Props) => {
  const [modifierElement, setModifierElement] = useState<ModifierElement>({ ...currentModifierElement })
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isProduct, setIsProduct] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])

  const submitText = currentModifierElement?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setModifierElement({ ...modifierElement, [name]: value })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setModifierElement({ ...modifierElement, [name]: checked })
  }

  const handleProduct = (event: any) => {
    const { value } = event.target
    const productName = products.find(product => product.id === parseInt(value))?.name
    setModifierElement({ ...modifierElement, name: productName ? productName : modifierElement.name, productReference: { ...initialProductReference, productId: value } })
  }

  const handleIsProduct = (event: any) => {
    const { checked } = event.target
    setIsProduct(checked)
    if (checked) {
      setModifierElement({ ...modifierElement, productReference: initialProductReference})
    }
  }



  const handleSubmit = () => {
    action(modifierElement)
  }

  useEffect(() => {
    const getRecipes = async () => {
      const response = await useGetList<Recipe[]>('recipes')
      setRecipes(response.data)
    }
    const getProducts = async () => {
      const response = await useGetList<Product[]>('products')
      setProducts(response.data)
    }
    getProducts()
    getRecipes()
    currentModifierElement.productReference && setIsProduct(true)
  }, [])


  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={modifierElement.name}
          customInputText={
            {
              label: 'Nombre de elemento', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputNumber value={modifierElement.price} customInputNumber={
          {
            label: 'Precio', name: 'price',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese un precio válido'
          }
        } />

        <CustomInputNumber value={modifierElement.quantity} customInputNumber={
          {
            label: 'Cantidad', name: 'quantity',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese una cantidad válida'
          }
        } />

        <CustomInputSelect value={modifierElement.defaultRecipeId}
          customInputSelect={
            {
              label: 'Receta predeterminada', name: 'defaultRecipeId',
              handleChange: handleChange, pattern: '', validationMessage: 'Receta predeterminada'
            }}
          data={recipes.map(recipe => { return { value: recipe.id, label: recipe.name } })}
          defaultLegend={'Recetas...'}
        />

        {
          !isProduct &&
          < CustomInputCheck value={modifierElement.combinable}
            customInputCheck={{
              label: '¿Es combinable?', pattern: '', validationMessage: '',
              name: 'combinable', handleChange: handleCheck
            }
            } />
        }

        {
          modifierElement.combinable &&
          <>
            <CustomInputNumber value={modifierElement.numberOfParts} customInputNumber={
              {
                label: 'Cantidad de partes', name: 'numberOfParts',
                handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese una cantidad válida'
              }
            } />

            <CustomInputSelect showLabel={false} value={modifierElement.combinableModifierGroupId}
              customInputSelect={
                {
                  label: 'Modificadores', name: 'combinableModifierGroupId',
                  handleChange: handleChange, pattern: '', validationMessage: 'Seleccione un grupo'
                }}
              data={modifierGroups.map(modifierGroup => { return { value: modifierGroup.id, label: modifierGroup.name } })}
              defaultLegend={'Modificadores'}
            />
          </>
        }

        {
          !modifierElement.combinable &&
          < CustomInputCheck value={isProduct}
            customInputCheck={{
              label: '¿Es producto?', pattern: '', validationMessage: '',
              name: 'isProduct', handleChange: handleIsProduct
            }
            } />
        }

        {
          isProduct && modifierElement.productReference &&
          <CustomInputSelect showLabel={false} value={modifierElement?.productReference?.productId}
            customInputSelect={
              {
                label: 'Productos', name: 'productId',
                handleChange: handleProduct, pattern: '', validationMessage: 'Seleccione un producto'
              }}
            data={products.map(product => { return { value: product.id, label: product.name } })}
            defaultLegend={'Productos...'}
          />
        }

      </GenericForm>
    </>
  )
}

export default ModifierElementForm