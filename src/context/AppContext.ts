import React from 'react'
import { appState } from '../types/initialState'

const AppContext = React.createContext<appState>({} as appState)

export default AppContext