import React, { useState } from 'react'
import ProductForm from '../../components/products/ProductForm'
import { usePatch } from '../../hooks/useAPI'
import { Product } from '../../types/Product'

interface Props {
  product: Product
  refreshProducts: () => void
}

const EditProduct = ({ product, refreshProducts }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editProduct: Product) => {
    const response = await usePatch<Product>(`products/${editProduct.id}`, editProduct)
    if (!response.error) {
      refreshProducts()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <ProductForm errors={errors} currentProduct={product} action={handleSubmit} />
  )
}

export default EditProduct