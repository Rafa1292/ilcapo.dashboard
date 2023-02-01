import React, { useState } from 'react'
import BrandForm from '../../components/brands/BrandForm'
import { usePatch } from '../../hooks/useAPI'
import { Brand } from '../../types/Brand'

interface Props {
  brand: Brand
  refreshBrands: () => void
}

const EditBrand = ({ brand, refreshBrands }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editBrand: Brand) => {
    const response = await usePatch<Brand>(`brands/${editBrand.id}`, editBrand)
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

export default EditBrand