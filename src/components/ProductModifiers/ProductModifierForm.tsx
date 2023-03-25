import React, { useEffect } from 'react'
import { buttonTypes } from '../../enums/buttonTypes'
import { useGetList } from '../../hooks/useAPI'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ProductModifier } from '../../types/ProductModifier'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import CustomBtn from '../generics/CustomBtn'
import CustomInputCheck from '../generics/CustomInputChecbox'
import CustomInputSelect from '../generics/CustomInputSelect'
import ModifierElementUpgrdeForm from '../modifierElementUpgrades/ModifierElementUpgradeForm'

interface Props {
  action: (productModifier: ProductModifier) => void
  productId: number
  error: string
}
const initialProductModifier: ProductModifier = {
  id: 0,
  modifierGroupId: 0,
  modifierGroup: undefined,
  productId: 0,
  createdBy: 1,
  updatedBy: 1,
  delete: false
}

const ProductModifierForm = ({ action, productId, error }: Props) => {
  const [modifierGroups, setModifierGroups] = React.useState<ModifierGroup[]>([])
  const [productModifier, setProductModifier] = React.useState<ProductModifier>({ ...initialProductModifier, productId })

  const handleModifierGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const modifierGroupId = parseInt(event.target.value)
    setProductModifier({ ...productModifier, modifierGroupId })
  }

  useEffect(() => {
    const getModifierGroups = async () => {
      const response = await useGetList<ModifierGroup[]>('modifierGroups')
      if (!response.error) {
        setModifierGroups(response.data)
      }
    }
    getModifierGroups()
  }, [])
  return (
    <>
      <div className="col-12 d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-4 p-2">
          <CustomInputSelect showLabel={false} value={0}
            customInputSelect={
              {
                label: 'Modificadores', name: 'saleItemCategoryId',
                handleChange: (handleModifierGroupChange), pattern: '', validationMessage: 'Seleccione un grupo'
              }}
            data={modifierGroups.map(modifierGroup => { return { value: modifierGroup.id, label: modifierGroup.name } })}
            defaultLegend={'Modificadores'}
          />
        </div>

        <CustomBtn action={(() => action(productModifier))} buttonType={buttonTypes.success} height='30px' />
        {
          error && <div className='mx-3 text-danger'>{error}</div>
        }
      </div>
    </>
  )
}

export default ProductModifierForm
