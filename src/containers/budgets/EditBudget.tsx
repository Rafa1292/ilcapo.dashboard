import React, { useState } from 'react'
import BudgetForm from '../../components/budgets/BudgetForm'
import { usePatch } from '../../hooks/useAPI'
import { Budget } from '../../types/Budget'

interface Props {
  budget: Budget
  refreshBudgets: () => void
}

const EditBudget = ({ budget, refreshBudgets }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (editBudget: Budget) => {
    const response = await usePatch<Budget>(`budgets/${editBudget.id}`, editBudget, true)
    if (!response.error) {
      refreshBudgets()
    }
    else{
      setErrors(response.message)
    }
  }

  return (
    <BudgetForm errors={errors} currentBudget={budget} action={handleSubmit} />
  )
}

export default EditBudget