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
import InputCategories from './pages/InputCategories'
import Brands from './pages/Brands'
import AddProviders from './pages/inputs/AddProviders'

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
            <Route path="/Inputs" element={<Inputs />} />
            <Route path="/InputCategories" element={<InputCategories />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/Brands" element={<Brands />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
