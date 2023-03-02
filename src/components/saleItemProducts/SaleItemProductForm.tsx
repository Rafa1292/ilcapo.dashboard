import React, { useEffect, useState } from 'react'
import { useGetList } from '../../hooks/useAPI'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputNumber from '../generics/CustomInputNumber'
import { SaleItemProduct } from '../../types/SaleItemProduct'
import CustomBtn from '../generics/CustomBtn'
import { buttonTypes } from '../../enums/buttonTypes'
import * as validator from '../../utils/errorValidation'
import { Product } from '../../types/Product'
import { regexOptions } from '../../enums/regexOptions'

interface Props {
  currentSaleItemProduct: SaleItemProduct
  action?: (saleItemProduct: SaleItemProduct) => void
  errors?: string[]
  cancelAction?: () => void
}

const SaleItemProductForm = ({ currentSaleItemProduct, errors, action, cancelAction }: Props) => {
  const [saleItemProduct, setSaleItemProduct] = useState<SaleItemProduct>(currentSaleItemProduct)
  const [products, setProducts] = useState<Product[]>([])

  const handleChange = (event: any) => {
    const { name, value } = event.target
    const val = value === '' ? '' : parseInt(value)
    setSaleItemProduct({ ...saleItemProduct, [name]: val })
  }

  const handleSubmit = () => {
    if (validate() && action) {
      action(saleItemProduct)
      resetSaleItemProduct()
    }
  }

  const setUniqueId = () => {
    if (saleItemProduct.id === 0) {
      setSaleItemProduct({ ...saleItemProduct, id: new Date(Date.now()).valueOf() })
    }
  }

  const validate = () => {
    const quantityVal = validator.validateNumber(saleItemProduct.quantity, 'quantity', /^[0-9]*$/, false)
    const productVal = validator.validateNumber(saleItemProduct.productId, 'productId', /^[1-9]*$/)

    if (quantityVal && productVal) {
      return true
    } else {
      return false
    }
  }

  const resetSaleItemProduct = () => {
    if (cancelAction) {
      cancelAction()
    }
    else {
      setSaleItemProduct({ ...currentSaleItemProduct, id: new Date(Date.now()).valueOf() })
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      const response = await useGetList<Product[]>('products')
      if (!response.error) {
        setProducts(response.data)
      }
    }
    getProducts()
    setUniqueId()
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap justify-content-center col-12 p-0'>
        {
          errors &&
          <div className="col-12 d-flex justify-content-center">
            <ul className="list-group list-group-flush">
              {
                errors.map((error, index) => (
                  <li key={index} className="list-group-item text-danger">{error}</li>
                ))
              }
            </ul>
          </div>
        }
        <div className="col-2 p-1">
          <CustomInputSelect showLabel={true} value={saleItemProduct.productId}
            customInputSelect={
              {
                label: 'Producto', name: 'productId',
                handleChange: handleChange, pattern: '', validationMessage: 'Seleccione un producto'
              }}
            data={products.map(product => { return { value: product.id, label: product.name } })}
            defaultLegend={'Seleccionar...'}
          />
        </div>

        <div className="col-2 p-1">
          <CustomInputNumber showLabel={true} value={saleItemProduct.quantity} customInputNumber={
            {
              label: 'Cantidad', name: 'quantity',
              handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese una cantidad válida'
            }
          } />
        </div>

        <div className="col-2 p-1">
          <CustomInputNumber showLabel={true} value={saleItemProduct.discount} customInputNumber={
            {
              label: 'Descuento', name: 'discount',
              handleChange: handleChange, pattern: regexOptions.integerLengthTwo, validationMessage: 'Ingrese un descuento válido'
            }
          } />
        </div>

        <div className="py-3 px-1 d-flex justify-content-center align-items-center">
          <CustomBtn height='30px' buttonType={buttonTypes.success} action={handleSubmit} />
        </div>
        <div className="py-3 px-1 d-flex justify-content-center">
          <CustomBtn height='30px' buttonType={buttonTypes.cancel} action={resetSaleItemProduct} />
        </div>
      </div>
    </>
  )
}

export default SaleItemProductForm