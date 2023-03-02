import React, { useEffect, useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputNumber from '../generics/CustomInputNumber'
import { SaleItem } from '../../types/SaleItem'
import CustomInputSelect from '../generics/CustomInputSelect'
import { SaleItemCategory } from '../../types/SaleItemCategory'
import { useGetList } from '../../hooks/useAPI'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentSaleItem: SaleItem
  action: (saleItem: SaleItem) => void
  errors?: string[]
}

const SaleItemForm = ({ currentSaleItem, action, errors }: Props) => {
  const [saleItem, setSaleItem] = useState<SaleItem>(currentSaleItem)
  const [saleItemCategories, setSaleItemCategories] = useState<SaleItemCategory[]>([])
  const submitText = currentSaleItem?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSaleItem({ ...saleItem, [name]: value })
  }

  const handleSubmit = () => {
    action(saleItem)
  }

  useEffect(() => {
    const getSaleItemCategories = async () => {
      const response = await useGetList<SaleItemCategory[]>('saleItemCategories')
      if (!response.error) {
        setSaleItemCategories(response.data)
      }
    }
    getSaleItemCategories()
  }, [])
  

  return (
    <>
      <GenericForm errors={errors} submitText={submitText} handleSubmit={handleSubmit}>
        <CustomInputText value={saleItem.name}
          customInputText={
            {
              label: 'Nombre', name: 'name',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputText value={saleItem.description}
          customInputText={
            {
              label: 'Descripcion', name: 'description',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese una descripcion válida'
            }
          } />

        <CustomInputNumber value={saleItem.price} customInputNumber={
          {
            label: 'Precio', name: 'price',
            handleChange: handleChange, pattern: regexOptions.decimal, validationMessage: 'Ingrese un precio válido'
          }
        } />


        <CustomInputSelect value={saleItem.saleItemCategoryId}
          customInputSelect={
            {
              label: 'Categoria', name: 'saleItemCategoryId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione una categoria'
            }}
          data={saleItemCategories.map(category => { return { value: category.id, label: category.name } })}
          defaultLegend={'Seleccione una categoria'}
        />
      </GenericForm>
    </>
  )
}

export default SaleItemForm