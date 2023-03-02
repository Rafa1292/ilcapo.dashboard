import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useGetList } from '../../hooks/useAPI'
import { ModifierElement } from '../../types/ModifierElement'
import CustomInputNumber from '../generics/CustomInputNumber'
import { Product } from '../../types/Product'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentModifierElement: ModifierElement
  action: (modifierElement: ModifierElement) => void
  errors?: string[]
}

const ModifierElementForm = ({ currentModifierElement, action, errors }: Props) => {
  const [modifierElement, setModifierElement] = useState<ModifierElement>(currentModifierElement)
  const [products, setProducts] = useState<Product[]>([])
  const submitText = currentModifierElement?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setModifierElement({ ...modifierElement, [name]: value })
  }

  const handleProductChange = (event: any) => {
    const { name, value } = event.target
    const productName = products.find(product => product.id === parseInt(value))?.name
    setModifierElement({ ...modifierElement, [name]: value, name: productName ? productName : '' })

  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    if (!checked) {
      setModifierElement({ ...modifierElement, [name]: checked, productReferenceId: 0 })
    }
    else {
      setModifierElement({ ...modifierElement, [name]: checked })
    }
  }

  const handleSubmit = () => {
    action(modifierElement)
  }

  useEffect(() => {
    const getProducts = async () => {
      const response = await useGetList<Product[]>('products')
      setProducts(response.data)
    }
    getProducts()
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

        <CustomInputCheck value={modifierElement.isProduct} customInputCheck={
          {
            label: 'Es un producto', name: 'isProduct',
            handleChange: handleCheck, pattern: '', validationMessage: ''
          }
        } />

        {
          modifierElement.isProduct &&
          <CustomInputSelect value={modifierElement.productReferenceId}
            customInputSelect={
              {
                label: 'Producto', name: 'productReferenceId',
                handleChange: handleProductChange, pattern: '', validationMessage: 'Seleccione un producto'
              }}
            data={products.map(recipe => { return { value: recipe.id, label: recipe.name } })}
            defaultLegend={'Seleccione un producto'}
          />
        }


      </GenericForm>
    </>
  )
}

export default ModifierElementForm