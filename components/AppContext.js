import { createContext, useContext } from 'react'

const AppContext = createContext({})

export default function AppContextWrapper({ children }) {
  let contextData = { bh_state: 'Yohoho!' }
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
