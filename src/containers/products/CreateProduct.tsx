import React, { useState } from 'react'
import ProductForm from '../../components/products/ProductForm'
import { usePost } from '../../hooks/useAPI'
import { Product } from '../../types/Product'

interface Props {
  product: Product
  refreshProducts: () => void
}

const CreateProduct = ({ product, refreshProducts }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newProduct: Product) => {
    const response = await usePost<Product>('products', newProduct)
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

export default CreateProduct