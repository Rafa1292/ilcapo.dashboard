import React, { useEffect, useState } from 'react'
import { Menu } from '../../types/Menu'
import { useGetList } from '../../hooks/useAPI'
import CustomInputCheck from '../generics/CustomInputChecbox'
import CustomInputNumber from '../generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'
import { UpgradeElementPrice } from '../../types/UpgradeElementPrice'

const initialUpgradeElementPrice: UpgradeElementPrice = {
  id: 0,
  menuId: 0,
  price: 0,
  delete: false,
  upgradeId: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 0,
  updatedBy: 0,
}

interface Props {
  currentUpgradeElementPrice: UpgradeElementPrice | null
  menu: Menu
  addUpgradeElementPrice: (upgradeElementPrice: UpgradeElementPrice) => void
  removeUpgradeElementPrice: (upgradeElementPrice: UpgradeElementPrice) => void
}

const UpgradeElementPriceComponent = ({
  menu,
  currentUpgradeElementPrice,
  addUpgradeElementPrice,
  removeUpgradeElementPrice,
}: Props) => {
  const [upgradeElementPrice, setUpgradeElementPrice] = useState<UpgradeElementPrice>(initialUpgradeElementPrice)
  const [show, setShow] = useState<boolean>(false)

  const handleCheck = (event: any) => {
    const { checked } = event.target
    if (checked) {
      setShow(true)
      addUpgradeElementPrice({ ...initialUpgradeElementPrice, menuId: menu.id })
    } else {
      setShow(false)
      removeUpgradeElementPrice(upgradeElementPrice)
    }
  }

  useEffect(() => {
    if (currentUpgradeElementPrice !== null) {
      setUpgradeElementPrice(currentUpgradeElementPrice)
      setShow(true)
    } else {
      setUpgradeElementPrice({ ...initialUpgradeElementPrice, menuId: menu.id })
      setShow(false)
    }
  }, [currentUpgradeElementPrice])

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
            {currentUpgradeElementPrice !== null && (
              <CustomInputNumber
                showLabel={false}
                value={upgradeElementPrice.price}
                customInputNumber={{
                  label: 'Precio',
                  name: 'price',
                  handleChange: (ev) =>
                    addUpgradeElementPrice({ ...upgradeElementPrice, price: ev.target.value }),
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

export default UpgradeElementPriceComponent
