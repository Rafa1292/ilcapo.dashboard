import React, { useEffect, useState } from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'
import DeleteBudget from '../containers/budgets/DeleteBudget'
import BudgetFormContainer from '../containers/budgets/BudgetFormContainer'
import { useGetList } from '../hooks/useAPI'
import { Budget } from '../types/Budget'
import { Months } from '../utils/monthsEnum'

const Budgets = () => {
  const initialBudget: Budget = {
    id: 0,
    budgetMonth: 0,
    orangeGoal: 0,
    greenGoal: 0,
    blueGoal: 0,
    expectedProfit: 0,
    inventoryPercentage: 0,
    fixedExpense: 0,
    delete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 0,
    updatedBy: 0,
  }
  const [show, setShow] = useState<boolean>(false)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [budget, setBudget] = useState<Budget>(initialBudget)

  const addBudget = () => {
    setBudget(initialBudget)
    setShow(true)
  }

  const editBudget = (id: number) => {
    const editBudget = budgets.find((budget) => budget.id === id)
    if (editBudget) {
      setBudget(editBudget)
      setShow(true)
    }
  }

  const refreshBudgets = async () => {
    const response = await useGetList<Budget[]>('budgets', true)
    if (!response.error) {
      console.log(response.data)
      setBudgets(response.data)
      setShow(false)
    }
  }

  useEffect(() => {
    const getBudgets = async () => {
      await refreshBudgets()
    }
    getBudgets()
  }, [])

  return (
    <div className='col-lg-6 justify-content-center d-flex  flex-wrap'>
      <h1 className='my-2 col-12 text-center'>Presupuestos</h1>
      <BudgetFormContainer
        refreshBudgets={refreshBudgets}
        budget={budget}
        addBudget={addBudget}
        show={show}
        setShow={setShow}
      />
      {budgets.length > 0 && (
        <Table headers={['#', 'Nombre', '']}>
          {budgets.map((budget, index) => (
            <TableRow
              key={index}
              tableData={[budget.id.toString(), Months[budget.budgetMonth]]}
            >
              <button
                className='btn btn-outline-secondary m-2'
                onClick={() => editBudget(budget.id)}
              >
                Editar
              </button>
              <DeleteBudget id={budget.id} refreshBudgets={refreshBudgets} />
            </TableRow>
          ))}
        </Table>
      )}
    </div>
  )
}

export default Budgets
