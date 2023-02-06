import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { IngredientCategory } from '../../types/IngredientCategory'

interface Props {
  refreshIngredientCategories: () => void
  id: number
}
const DeleteIngredientCategory = ({ refreshIngredientCategories, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteIngredientCategory()
    await refreshIngredientCategories()
    setShow(false)
  }

  const deleteIngredientCategory = async () => {
    const response = await useDelete<IngredientCategory>(`ingredientCategories/${id}`)
    if (!response.error) {
      refreshIngredientCategories()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='my-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar categoria' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar esta categoria?</h6>
        <div className="col-12 d-flex flex-wrap justify-content-center">
          <Button variant={'danger'} className='m-2' onClick={handleSubmit}>
            Eliminar
          </Button>
          <Button variant={'dark'} className='m-2' onClick={(() => setShow(false))}>
            Cancelar
          </Button>
        </div>
      </CustomModal>
    </>
  )
}

export default DeleteIngredientCategory