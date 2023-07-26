import React, { useEffect, useState } from 'react'
import { Menu } from '../../types/Menu'
import { useGetList } from '../../hooks/useAPI'
import CustomInputCheck from '../generics/CustomInputChecbox'
import CustomInputNumber from '../generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'
import { ElementPrice } from '../../types/ElementPrice'

const initialElementPrice: ElementPrice = {
  id: 0,
  menuId: 0,
  price: 0,
  delete: false,
  elementId: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 0,
  updatedBy: 0,
}

interface Props {
  currentElementPrice: ElementPrice | null
  menu: Menu
  addElementPrice: (elementPrice: ElementPrice) => void
  removeElementPrice: (elementPrice: ElementPrice) => void
}

const ElementPriceComponent = ({
  menu,
  currentElementPrice,
  addElementPrice,
  removeElementPrice: removeElementPrice,
}: Props) => {
  const [elementPrice, setElementPrice] = useState<ElementPrice>(initialElementPrice)
  const [show, setShow] = useState<boolean>(false)

  const handleCheck = (event: any) => {
    const { checked } = event.target
    if (checked) {
      setShow(true)
      addElementPrice({ ...initialElementPrice, menuId: menu.id })
    } else {
      setShow(false)
      removeElementPrice(elementPrice)
    }
  }

  useEffect(() => {
    if (currentElementPrice !== null) {
      setElementPrice(currentElementPrice)
      setShow(true)
    } else {
      setElementPrice({ ...initialElementPrice, menuId: menu.id })
      setShow(false)
    }
  }, [currentElementPrice])

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
            {currentElementPrice !== null && (
              <CustomInputNumber
                showLabel={false}
                value={elementPrice.price}
                customInputNumber={{
                  label: 'Precio',
                  name: 'price',
                  handleChange: (ev) =>
                    addElementPrice({ ...elementPrice, price: ev.target.value }),
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

export default ElementPriceComponent
