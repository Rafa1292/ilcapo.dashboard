import React from 'react'
import '../../scss/sideMenu.scss'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-dark shadow sidebar collapse"
      >
        <div className="position-sticky pt-3 sidebar-sticky scroll">
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
                Medidas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/InputCategories'>
                <span data-feather="home" className="align-text-bottom" />
                Categorias de insumo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Brands'>
                <span data-feather="home" className="align-text-bottom" />
                Marcas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Inputs'>
                <span data-feather="home" className="align-text-bottom" />
                Insumos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/IngredientCategories'>
                <span data-feather="home" className="align-text-bottom" />
                Categorias de ingrediente
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Ingredients'>
                <span data-feather="home" className="align-text-bottom" />
                Ingredientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Recipes'>
                <span data-feather="home" className="align-text-bottom" />
                Recetas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/SaleItemCategories'>
                <span data-feather="home" className="align-text-bottom" />
                Categorias de venta
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Products'>
                <span data-feather="home" className="align-text-bottom" />
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/SaleItems'>
                <span data-feather="home" className="align-text-bottom" />
                Items de venta
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/ModifierGroups'>
                <span data-feather="home" className="align-text-bottom" />
                Grupos modificadores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Users'>
                <span data-feather="home" className="align-text-bottom" />
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Menus'>
                <span data-feather="home" className="align-text-bottom" />
                Menús
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Accounts'>
                <span data-feather="home" className="align-text-bottom" />
                Cuentas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/PayMethods'>
                <span data-feather="home" className="align-text-bottom" />
                Metodos de pago
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to='/Budgets'>
                <span data-feather="home" className="align-text-bottom" />
                Presupuestos
              </Link>
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