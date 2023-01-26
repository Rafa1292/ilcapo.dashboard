import React from 'react'
import Loader from './loader'

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}
const Content = ({ isLoading, children }: Props) => {
  return (
    <div className='col-12 m-0 py-0 px-1 d-flex flex-wrap justify-content-center align-content-center'>
      {
        isLoading ?
          (
            <Loader />
          )
          :
          (
            children
          )
      }
    </div>
  )
}

export default Content