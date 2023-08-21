import React from 'react'
import { Budget } from '../../types/Budget'
import CreateBudget from './CreateBudget'
import EditBudget from './EditBudget'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  budget: Budget
  addBudget: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshBudgets: () => void
}

const BudgetFormContainer = ({ refreshBudgets, budget, addBudget, show, setShow }: Props) => {
  const title = budget.id === 0 ? 'Agregar' : 'Editar'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addBudget}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {budget.id === 0 ?
          <CreateBudget refreshBudgets={refreshBudgets} budget={budget} /> :
          <EditBudget refreshBudgets={refreshBudgets} budget={budget} />}
      </CustomModal>
    </>
  )
}

export default BudgetFormContainer