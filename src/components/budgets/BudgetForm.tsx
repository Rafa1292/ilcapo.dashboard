import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import { Budget } from '../../types/Budget'
import { regexOptions } from '../../enums/regexOptions'
import CustomInputSelect from '../generics/CustomInputSelect'
import { Months } from '../../utils/monthsEnum'
import CustomInputNumber from '../generics/CustomInputNumber'
interface Props {
  currentBudget: Budget
  action: (budget: Budget) => void
  errors?: string[]
}

const BudgetForm = ({ currentBudget, action, errors }: Props) => {
  const [budget, setBudget] = useState<Budget>(currentBudget)
  const submitText = currentBudget?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setBudget({ ...budget, [name]: value })
  }

  const handleSubmit = () => {
    action(budget)
  }

  useEffect(() => {
    {Object.keys(Months)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => {
        console.log({ value: Number(key), label: Months[Number(key)] })
      })}
  }, [])


  return (
    <>
      <GenericForm
        errors={errors}
        submitText={submitText}
        handleSubmit={handleSubmit}
      >
        <CustomInputSelect
          value={budget.budgetMonth}
          customInputSelect={{
            label: 'Mes',
            name: 'budgetMonth',
            handleChange: handleChange,
            pattern: '',
            validationMessage: 'Seleccione un mes',
          }}
          data={Object.keys(Months)
            .filter((key) => !isNaN(Number(key)))
            .map((key) => {
              return { value: Number(key), label: Months[Number(key)] }
            })}
          defaultLegend={'Seleccione un mes'}
        />

        <CustomInputNumber
          value={budget.inventoryPercentage}
          customInputNumber={{
            label: 'Porcentaje de inventario',
            name: 'inventoryPercentage',
            handleChange: handleChange,
            pattern: regexOptions.integer,
            validationMessage: 'Ingrese un monto válido',
          }}
        />

        <CustomInputNumber
          value={budget.fixedExpense}
          customInputNumber={{
            label: 'Gasto fijo',
            name: 'fixedExpense',
            handleChange: handleChange,
            pattern: regexOptions.integer,
            validationMessage: 'Ingrese un monto válido',
          }}
        />

        <CustomInputNumber
          value={budget.expectedProfit}
          customInputNumber={{
            label: 'Ganancia esperada',
            name: 'expectedProfit',
            handleChange: handleChange,
            pattern: regexOptions.integer,
            validationMessage: 'Ingrese un monto válido',
          }}
        />
      </GenericForm>
    </>
  )
}

export default BudgetForm
