import { createContext, useContext } from 'react'
const def: Record<string, string> = {}
const AppContext = createContext({ t: def })
export { AppContext }
