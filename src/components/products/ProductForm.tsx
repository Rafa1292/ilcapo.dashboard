import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
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

        <CustomInputText isRequired={false} value={product.description}
          customInputText={
            {
              label: 'Description de producto', name: 'description',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese una descripcion'
            }
          } />

        <CustomInputCheck value={product.allowsModify} customInputCheck={
          {
            label: 'Permite modificar', name: 'allowsModify',
            handleChange: handleCheck, pattern: '', validationMessage: ''
          }
        } />

        <CustomInputCheck value={product.needsCommand} customInputCheck={
          {
            label: 'Comanda', name: 'needsCommand',
            handleChange: handleCheck, pattern: '', validationMessage: ''
          }
        } />

      </GenericForm>
    </>
  )
}

export default productForm