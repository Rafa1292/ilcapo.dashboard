import React, { useEffect, useState } from 'react'
import { Menu } from '../../types/Menu'
import { useGetList } from '../../hooks/useAPI'
import { ItemPrice } from '../../types/ItemPrice'
import ItemPriceComponent from '../../components/itemPrices/ItemPriceComponent'

interface Props {
  addItemPrice: (itemPrice: ItemPrice) => void
  itemPrices: ItemPrice[]
  removeItemPrice: (itemPrice: ItemPrice) => void
}

const ItemPriceContainer = ({ addItemPrice, removeItemPrice, itemPrices }: Props) => {
  const [menus, setMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getMenus = async () => {
      const response = await useGetList<Menu[]>('menus')
      if (!response.error) {
        setMenus(response.data)
      }
      setLoading(false)
    }
    getMenus()
  }, [])
  return (
    <div className='col-12  d-flex flex-wrap'>
      { !loading &&
      menus.map((menu: Menu) => (
        <ItemPriceComponent
          key={menu.id}
          menu={menu}
          addItemPrice={addItemPrice}
          currentItemPrice={
            itemPrices.find(
              (itemPrice: ItemPrice) => itemPrice.menuId === menu.id
            ) || null
          }
          removeItemPrice={removeItemPrice}
        />
      ))}
    </div>
  )
}

export default ItemPriceContainer
