import React, { useEffect, useState } from 'react'
import { regexOptions } from '../../enums/regexOptions'
import { ModifierGroup } from '../../types/ModifierGroup'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import CustomInputNumber from '../generics/CustomInputNumber'
import CustomInputSelect from '../generics/CustomInputSelect'
import CustomInputText from '../generics/CustomInputText'
import UpgradeElementPriceComponent from '../upgradeElementPrices/UpgradeElementPriceComponent'
import UpgradeElementPriceContainer from '../../containers/upgradeElementPrices/UpgradeElementPriceContainer'
import { UpgradeElementPrice } from '../../types/UpgradeElementPrice'

interface Props {
  modifierElementUpgrade: ModifierElementUpgrade
  modifierGroups: ModifierGroup[]
  handleChange: (event: any) => void
  addUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
  removeUpgradeElementPrice: (itemPrice: UpgradeElementPrice) => void
}

const ModifierElementUpgrdeForm = ({
  modifierElementUpgrade,
  addUpgradeElementPrice,
  removeUpgradeElementPrice,
  modifierGroups,
  handleChange,
}: Props) => {
  return (
    <div className='col-12 p-0 d-flex flex-wrap'>
      <div className='col-6 p-1'>
        <CustomInputText
          showLabel={false}
          value={modifierElementUpgrade.label}
          customInputText={{
            label: 'Etiqueta',
            name: 'label',
            handleChange: handleChange,
            pattern: regexOptions.text,
            validationMessage: 'Ingrese un nombre válido',
          }}
        />
      </div>
      <div className='col-6 p-1'>
        <CustomInputSelect
          showLabel={false}
          value={modifierElementUpgrade.newModifierGroupId}
          customInputSelect={{
            label: 'Modificadores',
            name: 'newModifierGroupId',
            handleChange: handleChange,
            pattern: '',
            validationMessage: 'Seleccione un grupo',
          }}
          data={modifierGroups.map((modifierGroup) => {
            return { value: modifierGroup.id, label: modifierGroup.name }
          })}
          defaultLegend={'Modificadores'}
        />
      </div>
      <div className='col-12 p-1'>
        <UpgradeElementPriceContainer
          addUpgradeElementPrice={addUpgradeElementPrice}
          removeUpgradeElementPrice={removeUpgradeElementPrice}
          upgradeElementPrices={modifierElementUpgrade.prices}
        />
      </div>
    </div>
  )
}

export default ModifierElementUpgrdeForm
