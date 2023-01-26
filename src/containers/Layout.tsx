import React from 'react'
import Navbar from '../components/Navbar'
import SideMenu from '../components/SideMenu'

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <SideMenu />
          <main className="col-md-9 ms-sm-auto col-lg-10 d-flex flex-wrap p-2 justify-content-center">
            {
              children
            }
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout