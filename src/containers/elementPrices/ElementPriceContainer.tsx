import React, { useEffect, useState } from 'react'
import { Menu } from '../../types/Menu'
import { useGetList } from '../../hooks/useAPI'
import { ItemPrice } from '../../types/ItemPrice'
import { ElementPrice } from '../../types/ElementPrice'
import ElementPriceComponent from '../../components/elementPrices/ElementPriceComponent'

interface Props {
  addElementPrice: (elementPrice: ElementPrice) => void
  elementPrices: ElementPrice[]
  removeElementPrice: (elementPrice: ElementPrice) => void
}

const ElementPriceContainer = ({ addElementPrice, removeElementPrice, elementPrices }: Props) => {
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
        <ElementPriceComponent
          key={menu.id}
          menu={menu}
          addElementPrice={addElementPrice}
          currentElementPrice={
            elementPrices.find(
              (elementPrice: ElementPrice) => elementPrice.menuId === menu.id
            ) || null
          }
          removeElementPrice={removeElementPrice}
        />
      ))}
    </div>
  )
}

export default ElementPriceContainer
