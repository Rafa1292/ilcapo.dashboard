import React from 'react'
import { useState } from 'react'
import Content from '../components/generics/Content'
import GenericForm from '../components/generics/GenericForm'
import ProviderForm from '../components/providers/ProviderForm'
const Home = () => {

  const [isLoading, setIsLoading] = useState(false)

 

  return (
    <Content isLoading={isLoading}>
    </Content>
  )
}

export default Home