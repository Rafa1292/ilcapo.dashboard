import React from 'react'
import { InputCategory } from '../../types/InputCategory'
import CreateInputCategory from './CreateInputCategory'
import EditInputCategory from './EditInputCategory'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'

interface Props {
  inputCategory: InputCategory
  addInputCategory: () => void
  show: boolean
  setShow: (show: boolean) => void
  refreshInputCategories: () => void
}

const InputCategoryFormContainer = ({ refreshInputCategories, inputCategory, addInputCategory, show, setShow }: Props) => {
  const title = inputCategory.id === 0 ? 'Agregar categoria' : 'Editar categoria'
  return (
    <>
      <Button variant={'outline-dark'} className='my-2' onClick={addInputCategory}>
        Agregar
      </Button>
      <CustomModal title={title} show={show} handleClose={(() => setShow(false))}>
        {inputCategory.id === 0 ?
          <CreateInputCategory refreshInputCategories={refreshInputCategories} inputCategory={inputCategory} /> :
          <EditInputCategory refreshInputCategories={refreshInputCategories} inputCategory={inputCategory} />}
      </CustomModal>
    </>
  )
}

export default InputCategoryFormContainer