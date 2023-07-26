import React, { useEffect, useState } from 'react'
import { Menu } from '../../types/Menu'
import { useGetList } from '../../hooks/useAPI'
import { UpgradeElementPrice } from '../../types/UpgradeElementPrice'
import UpgradeElementPriceComponent from '../../components/upgradeElementPrices/UpgradeElementPriceComponent'

interface Props {
  upgradeElementPrices: UpgradeElementPrice[]
  addUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
  removeUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
}

const ItemPriceContainer = ({ addUpgradeElementPrice, removeUpgradeElementPrice, upgradeElementPrices }: Props) => {
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
        <UpgradeElementPriceComponent
          key={menu.id}
          menu={menu}
          addUpgradeElementPrice={addUpgradeElementPrice}
          currentUpgradeElementPrice={
            upgradeElementPrices.find(
              (upgradeElementPrice: UpgradeElementPrice) => upgradeElementPrice.menuId === menu.id
            ) || null
          }
          removeUpgradeElementPrice={removeUpgradeElementPrice}
        />
      ))}
    </div>
  )
}

export default ItemPriceContainer
