import React, { useEffect, useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import CustomInputNumber from '../generics/CustomInputNumber'
import { SaleItem } from '../../types/SaleItem'
import CustomInputSelect from '../generics/CustomInputSelect'
import { SaleItemCategory } from '../../types/SaleItemCategory'
import { useGetList } from '../../hooks/useAPI'
import { regexOptions } from '../../enums/regexOptions'
import ItemPriceComponent from '../itemPrices/ItemPriceComponent'
import ItemPriceContainer from '../../containers/itemPrices/ItemPriceContainer'
import { ItemPrice } from '../../types/ItemPrice'

interface Props {
  currentSaleItem: SaleItem
  action: (saleItem: SaleItem) => void
  errors?: string[]
}

const SaleItemForm = ({ currentSaleItem, action, errors }: Props) => {
  const [saleItem, setSaleItem] = useState<SaleItem>(currentSaleItem)
  const [saleItemCategories, setSaleItemCategories] = useState<
    SaleItemCategory[]
  >([])
  const submitText = currentSaleItem?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSaleItem({ ...saleItem, [name]: value })
  }

  const handleSubmit = () => {
    action(saleItem)
  }

  const addItemPrice = (itemPrice: ItemPrice) => {
    const currentItemPrice = saleItem.prices.find(
      (ip: ItemPrice) => ip.menuId === itemPrice.menuId
    )
    if (currentItemPrice) {
      setSaleItem({
        ...saleItem,
        prices: saleItem.prices.map((ip: ItemPrice) =>
          ip.menuId === itemPrice.menuId ? itemPrice : ip
        ),
      })
    } else {
      setSaleItem({
        ...saleItem,
        prices: [...saleItem.prices, itemPrice],
      })
    }
  }

  const removeItemPrice = (itemPrice: ItemPrice) => {
    setSaleItem({
      ...saleItem,
      prices: saleItem.prices.filter(
        (ip: ItemPrice) => ip.menuId !== itemPrice.menuId
      ),
    })
  }

  useEffect(() => {
    const getSaleItemCategories = async () => {
      const response = await useGetList<SaleItemCategory[]>(
        'saleItemCategories'
      )
      if (!response.error) {
        setSaleItemCategories(response.data)
      }
    }
    getSaleItemCategories()
  }, [])

  return (
    <>
      <GenericForm
        errors={errors}
        submitText={submitText}
        handleSubmit={handleSubmit}
      >
        <CustomInputSelect
          showLabel={false}
          value={saleItem.saleItemCategoryId}
          customInputSelect={{
            label: 'Categoria',
            name: 'saleItemCategoryId',
            handleChange: handleChange,
            pattern: '',
            validationMessage: 'Seleccione una categoria',
          }}
          data={saleItemCategories.map((category) => {
            return { value: category.id, label: category.name }
          })}
          defaultLegend={'Seleccione una categoria'}
        />
        <CustomInputText
          value={saleItem.name}
          customInputText={{
            label: 'Nombre',
            name: 'name',
            handleChange: handleChange,
            pattern: regexOptions.text,
            validationMessage: 'Ingrese un nombre válido',
          }}
        />

        <ItemPriceContainer
          addItemPrice={addItemPrice}
          removeItemPrice={removeItemPrice}
          itemPrices={saleItem.prices}
        />
      </GenericForm>
    </>
  )
}

export default SaleItemForm
