import React, { useEffect } from 'react'
import { useState } from 'react'
import Content from '../components/generics/Content'
const Home = () => {

  const [isLoading, setIsLoading] = useState(false)


  return (
    <Content isLoading={isLoading}>
    </Content>
  )
}

export default Home