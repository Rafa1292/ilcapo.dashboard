import React from 'react'
import '../../scss/sideMenu.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {


  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky pt-3 sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/login">
                <span data-feather="home" className="align-text-bottom" />
                Login
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Providers'>
                <span data-feather="home" className="align-text-bottom" />
                Proveedores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Magnitudes'>
                <span data-feather="home" className="align-text-bottom" />
                Magnitudes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Measures'>
                <span data-feather="home" className="align-text-bottom" />
                Measures
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Tags">
                <span data-feather="file" className="align-text-bottom" />
                Etiquetas
              </a>
            </li>
          </ul>
        </div>
        <div className="bg-dark d-flex d-md-none justify-content-center align-items-center text-white d-flex col-12"
          style={{ position: 'absolute', bottom: '0', height: '40px', fontWeight: 'bold' }}>
          Sign-out
        </div>
      </nav>

    </>
  )
}

export default Navbar