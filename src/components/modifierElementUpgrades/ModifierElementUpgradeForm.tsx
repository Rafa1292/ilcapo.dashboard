import React, { useEffect, useState } from 'react'
import { regexOptions } from '../../enums/regexOptions'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import CustomInputNumber from '../generics/CustomInputNumber'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputText from '../generics/CustomInputText'

interface Props {
  modifierElementUpgrade: ModifierElementUpgrade
  modifierGroups: ModifierGroup[]
  handleChange: (event: any) => void
}

const ModifierElementUpgrdeForm = ({ modifierElementUpgrade, modifierGroups, handleChange }: Props) => {

  useEffect(() => {
    console.log('modifierElementUpgrade', modifierElementUpgrade)
  }, [])

  return (
    <div className='col-12 p-0 d-flex flex-wrap'>
      <div className="col-4 p-1">
        <CustomInputNumber showLabel={false} value={modifierElementUpgrade.price} customInputNumber={
          {
            label: 'Precio', name: 'price',
            handleChange: handleChange, pattern: regexOptions.integer, validationMessage: 'Ingrese un precio válido'
          }
        } />
      </div>
      <div className="col-4 p-1">
        <CustomInputText showLabel={false} value={modifierElementUpgrade.label}
          customInputText={
            {
              label: 'Etiqueta', name: 'label',
              handleChange: handleChange, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />
      </div>
      <div className="col-4 p-1">
        <CustomInputSelect showLabel={false} value={modifierElementUpgrade.newModifierGroupId}
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

export default ModifierElementUpgrdeForm