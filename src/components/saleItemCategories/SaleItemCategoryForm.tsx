import React, { useState } from 'react'
import { SaleItemCategory } from '../../types/SaleItemCategory'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'

interface Props {
  currentSaleItemCategory: SaleItemCategory
  action: (input: SaleItemCategory) => void
  errors?: string[]
}

const SaleItemCategoryForm = ({ currentSaleItemCategory, action, errors }: Props) => {
  const [saleItemCategory, setSaleItemCategory] = useState<SaleItemCategory>(currentSaleItemCategory)
  const submitText = currentSaleItemCategory?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSaleItemCategory({ ...saleItemCategory, [name]: value })
  }

  const handleSubmit = () => {
    action(saleItemCategory)
  }

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={saleItemCategory.name}
          customInputText={
            {
              label: 'Nombre de categoria', name: 'name',
              handleChange: handleChange, pattern: '[a-zA-Z0-9\\u00E0-\\u00FC\\s?]*',
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </GenericForm>
    </>
  )
}

export default SaleItemCategoryForm