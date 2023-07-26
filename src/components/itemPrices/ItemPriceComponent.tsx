import React, { useEffect, useState } from 'react'
import { Menu } from '../../types/Menu'
import { useGetList } from '../../hooks/useAPI'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { ItemPrice } from '../../types/ItemPrice'
import CustomInputNumber from '../generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'

const initialItemPrice: ItemPrice = {
  id: 0,
  menuId: 0,
  price: 0,
  delete: false,
  itemId: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 0,
  updatedBy: 0,
}

interface Props {
  currentItemPrice: ItemPrice | null
  menu: Menu
  addItemPrice: (itemPrice: ItemPrice) => void
  removeItemPrice: (itemPrice: ItemPrice) => void
}

const ItemPriceComponent = ({
  menu,
  currentItemPrice,
  addItemPrice,
  removeItemPrice,
}: Props) => {
  const [itemPrice, setItemPrice] = useState<ItemPrice>(initialItemPrice)
  const [show, setShow] = useState<boolean>(false)

  const handleCheck = (event: any) => {
    const { checked } = event.target
    if (checked) {
      setShow(true)
      addItemPrice({ ...initialItemPrice, menuId: menu.id })
    } else {
      setShow(false)
      removeItemPrice(itemPrice)
    }
  }

  useEffect(() => {
    if (currentItemPrice !== null) {
      setItemPrice(currentItemPrice)
      setShow(true)
    } else {
      setItemPrice({ ...initialItemPrice, menuId: menu.id })
      setShow(false)
    }
  }, [currentItemPrice])

  return (
    <>
      <div className='col-2 d-flex flex-wrap'>
        <div className='mx-2'>
          <CustomInputCheck
            value={show}
            customInputCheck={{
              label: menu.name,
              name: menu.id.toString(),
              pattern: '',
              validationMessage: '',
              handleChange: handleCheck,
            }}
          />
          <div className='col-12'>
            {currentItemPrice !== null && (
              <CustomInputNumber
                showLabel={false}
                value={itemPrice.price}
                customInputNumber={{
                  label: 'Precio',
                  name: 'price',
                  handleChange: (ev) =>
                    addItemPrice({ ...itemPrice, price: ev.target.value }),
                  pattern: regexOptions.decimal,
                  validationMessage: 'Ingrese un precio válido',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemPriceComponent
