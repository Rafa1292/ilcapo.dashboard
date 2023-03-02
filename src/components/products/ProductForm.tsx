import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import { Product } from '../../types/Product'
import CustomInputNumber from '../generics/CustomInputNumber'
import { Recipe } from '../../types/Recipe'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentProduct: Product
  action: (product: Product) => void
  errors?: string[]
}

const productForm = ({ currentProduct, action, errors }: Props) => {
  const [product, setProduct] = useState<Product>(currentProduct)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const submitText = currentProduct?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setProduct({ ...product, [name]: value })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setProduct({ ...product, [name]: checked })
  }

  const handleSubmit = () => {
    action(product)
  }

  useEffect(() => {
    const getRecipes = async () => {
      const response = await useGetList<Recipe[]>('recipes')
      setRecipes(response.data)
    }
    getRecipes()
  }, [])
  

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={product.name}
          customInputText={
            {
              label: 'Nombre de producto', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputText value={product.description}
          customInputText={
            {
              label: 'Description de producto', name: 'description',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese una descripcion'
            }
          } />

        <CustomInputNumber value={product.price} customInputNumber={
          {
            label: 'Precio', name: 'price',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese un precio válido'
          }
        } />

        <CustomInputSelect value={product.recipeId}
          customInputSelect={
            {
              label: 'Receta', name: 'recipeId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una receta'
            }}
          data={recipes.map(recipe => { return { value: recipe.id, label: recipe.name } })}
          defaultLegend={'Seleccione una receta'}
        />

        <CustomInputCheck value={product.allowsModify} customInputCheck={
          {
            label: 'Permite modificar', name: 'allowsModify',
            handleChange: handleCheck, pattern: '', validationMessage: ''
          }
        } />

      </GenericForm>
    </>
  )
}

export default productForm