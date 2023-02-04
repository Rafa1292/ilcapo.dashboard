import React from 'react'
import { useParams } from 'react-router-dom'
import AddInputToProvider from '../../containers/providers/AddInputToProvider'

const AddInputs = () => {
  const { id } = useParams()

  return (
    <>
      <AddInputToProvider id={Number(id)} />
    </>
  )
}

export default AddInputs