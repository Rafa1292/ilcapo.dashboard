import React, { useState } from 'react'
import BrandForm from '../../components/brands/BrandForm'
import { usePost } from '../../hooks/useAPI'
import { Brand } from '../../types/Brand'

interface Props {
  brand: Brand
  refreshBrands: () => void
}

const CreateBrand = ({ brand, refreshBrands }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newBrand: Brand) => {
    const response = await usePost<Brand>('brands', newBrand)
    if (!response.error) {
      refreshBrands()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <BrandForm errors={errors} currentBrand={brand} action={handleSubmit} />
  )
}

export default CreateBrand