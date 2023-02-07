import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import CustomModal from '../../components/generics/CustomModal'
import { useDelete } from '../../hooks/useAPI'
import { Ingredient } from '../../types/Ingredient'

interface Props {
  refreshIngredients: () => void
  id: number
}

const DeleteIngredient = ({ refreshIngredients, id }: Props) => {

  const [show, setShow] = useState<boolean>(false)

  const handleSubmit = async () => {
    await deleteIngredient()
    await refreshIngredients()
    setShow(false)
  }

  const deleteIngredient = async () => {
    const response = await useDelete<Ingredient>(`ingredients/${id}`)
    if (!response.error) {
      refreshIngredients()
    }
  }

  return (
    <>
      <Button variant={'outline-danger'} className='m-2' onClick={(() => setShow(true))}>
        Eliminar
      </Button>
      <CustomModal title='Eliminar ingrediente' show={show} handleClose={(() => setShow(false))}>
        <h6 className='col-12 d-flex justify-content-center text-danger fw-semibold my-3'>¿Estas seguro que deseas eliminar este ingrediente?</h6>
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

export default DeleteIngredient