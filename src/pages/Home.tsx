import React from 'react'
import { useState } from 'react'
import Content from '../components/Content'
import GenericForm from '../components/generics/GenericForm'
import ProviderForm from '../components/ProviderForm'
const Home = () => {

  const [isLoading, setIsLoading] = useState(false)

 

  return (
    <Content isLoading={isLoading}>
      <ProviderForm/>
    </Content>
  )
}

export default Home