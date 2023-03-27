import React from 'react'
import ProductModifierForm from '../../components/ProductModifiers/ProductModifierForm'
import { usePost } from '../../hooks/useAPI'
import { ProductModifier } from '../../types/ProductModifier'

interface Props {
  productId: number
  refreshProducts: () => void
}

const CreateProductModifier = ({ productId, refreshProducts }: Props) => {
  const [error, setError] = React.useState<string>('')

  const saveProductModifier = async (productModifier: ProductModifier) => {
    if (productModifier.modifierGroupId === 0) {
      setError('Por favor seleccione un grupo modificador')
    } else {
      const response = await usePost<ProductModifier>('productModifiers', productModifier)
      if (response.error) {
        setError(response.message[0])
      }
      else {
        refreshProducts()
      }
    }
  }

  return (
    <>
      <ProductModifierForm error={error} action={saveProductModifier} productId={productId} />
    </>
  )
}

export default CreateProductModifier