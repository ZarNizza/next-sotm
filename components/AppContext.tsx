import { createContext, useContext } from 'react'
const def: Record<string, string> = {}
const AppContext = createContext({ u: '', t: def })
export { AppContext }
