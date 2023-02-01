import React from 'react'
import AppContext from './context/AppContext'
import { useInitialState } from './hooks/useIntitialState'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/app.scss'
import Home from './pages/Home'
import Layout from './containers/generics/Layout'
import Providers from './pages/Providers'
import Magnitudes from './pages/Magnitudes'
import Measures from './pages/Measures'
import Inputs from './pages/Inputs'
import InputCategories from './pages/InputCategories'

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
            <Route path="/Inputs" element={<Inputs />} />
            <Route path="/InputCategories" element={<InputCategories />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
