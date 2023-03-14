import React, { useState } from 'react'
import { regexOptions } from '../../enums/regexOptions'
import { ModifierGroup } from '../../types/ModifierGroup'
import { UpgradeModifierGroup } from '../../types/UpgradeModifierGroup'
import CustomInputNumber from '../generics/CustomInputNumber'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputText from '../generics/CustomInputText'

interface Props {
  upgradeModifierGroup: UpgradeModifierGroup
  modifierGroups: ModifierGroup[]
}

const ModifierGroupUpgrdeForm = ({ upgradeModifierGroup, modifierGroups }: Props) => {
  const [currentUpgradeModifierGroup, setUpgradeModifierGroup] = useState<UpgradeModifierGroup>(upgradeModifierGroup)

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setUpgradeModifierGroup({ ...currentUpgradeModifierGroup, [name]: value })
  }

  return (
    <div className='col-12 p-0 d-flex flex-wrap'>
      <div className="col-4 p-1">
        <CustomInputNumber showLabel={false} value={currentUpgradeModifierGroup.price} customInputNumber={
          {
            label: 'Precio esperado', name: 'price',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese un precio válido'
          }
        } />
      </div>
      <div className="col-4 p-1">
        <CustomInputText showLabel={false} value={currentUpgradeModifierGroup.label}
          customInputText={
            {
              label: 'Etiqueta', name: 'label',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </div>
      <div className="col-4 p-1">
        <CustomInputSelect showLabel={false} value={currentUpgradeModifierGroup.newModifierGroupId}
          customInputSelect={
            {
              label: 'Modificadores', name: 'newModifierGroupId',
              handleChange: handleChange, pattern: '', validationMessage: 'Seleccione un grupo'
            }}
          data={modifierGroups.map(modifierGroup => { return { value: modifierGroup.id, label: modifierGroup.name } })}
          defaultLegend={'Modificadores'}
        />
      </div>
    </div>
  )
}

export default ModifierGroupUpgrdeForm