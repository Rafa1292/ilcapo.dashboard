import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Recipe } from '../../types/Recipe'

interface Props {
  refreshRecipes: () => void
  id: number
}

const DeleteRecipe = ({ refreshRecipes, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteRecipe()
    await refreshRecipes()
    setShow(false)
  }

  const deleteRecipe = async () => {
    const response = await useDelete<Recipe>(`recipes/${id}`)
    if (!response.error) {
      refreshRecipes()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='m-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar receta' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar esta receta?</h6>
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

export default DeleteRecipe