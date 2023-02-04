import React from 'react'
import AddProviderToInput from '../../containers/inputs/AddProviderToInput'
import { useParams } from 'react-router-dom'

const AddProviders = () => {
  const {id} = useParams()
  return (
    <AddProviderToInput id={Number(id)}/>
  )
}

export default AddProviders