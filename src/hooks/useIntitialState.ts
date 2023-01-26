import { useState } from 'react'
import { appState } from '../types/initialState'

const initialState: appState = {
  loader: true,
}

export const useInitialState = () => {
  const [state, setState] = useState(initialState)

  return { state, setState }
}

