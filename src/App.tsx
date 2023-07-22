import React from 'react'
import AppContext from './context/AppContext'
import { useInitialState } from './hooks/useIntitialState'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/app.scss'
import Home from './pages/Home'
import Layout from './containers/generics/Layout'
import Providers from './pages/providers/Providers'
import Magnitudes from './pages/Magnitudes'
import Measures from './pages/Measures'
import Inputs from './pages/inputs/Inputs'
import Recipes from './pages/Recipes'
import InputCategories from './pages/InputCategories'
import IngredientCategories from './pages/IngredientCategories'
import Ingredients from './pages/Ingredients'
import Brands from './pages/Brands'
import AddProviders from './pages/inputs/AddProviders'
import AddInputs from './pages/providers/AddInputs'
import SaleItemCategories from './pages/SaleItemCategories'
import Products from './pages/Products'
import SaleItems from './pages/SaleItems'
import ModifierGroups from './pages/ModifierGroups'
import Users from './pages/Users'
import Menus from './pages/Menus'

function App() {
  const { state } = useInitialState()
  return (
    <AppContext.Provider value={state}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Providers" element={<Providers />} />
            <Route path="/Magnitudes" element={<Magnitudes />} />
            <Route path="/Measures" element={<Measures />} />
            <Route path="/Inputs/AddProvider/:id" element={<AddProviders />} />
            <Route path="/Providers/AddInput/:id" element={<AddInputs />} />
            <Route path="/Inputs" element={<Inputs />} />
            <Route path="/InputCategories" element={<InputCategories />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/IngredientCategories" element={<IngredientCategories />} />
            <Route path="/Ingredients" element={<Ingredients />} />
            <Route path="/Recipes" element={<Recipes />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/SaleItemCategories" element={<SaleItemCategories />} />
            <Route path="/SaleItems" element={<SaleItems />} />
            <Route path="/ModifierGroups" element={<ModifierGroups />} />
            <Route path="/users" element={<Users />} />
            <Route path="/menus" element={<Menus />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
