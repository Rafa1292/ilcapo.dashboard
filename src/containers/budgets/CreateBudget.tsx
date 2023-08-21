import React, { useState } from 'react'
import BudgetForm from '../../components/budgets/BudgetForm'
import { usePost } from '../../hooks/useAPI'
import { Budget } from '../../types/Budget'

interface Props {
  budget: Budget
  refreshBudgets: () => void
}

const CreateBudget = ({ budget, refreshBudgets }: Props) => {
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (newBudget: Budget) => {
    const response = await usePost<Budget>('budgets', newBudget, true)
    if (!response.error) {
      refreshBudgets()
    } else {
      setErrors(response.message)
    }
  }

  return (
    <BudgetForm errors={errors} currentBudget={budget} action={handleSubmit} />
  )
}

export default CreateBudget
