import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchConfiguration } from '../api';
import { convertConfiguration, getSideMenu } from '../utils'

const SimpleUIContext = createContext({})

interface ContextProps {
  children: React.ReactNode
}

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [loading, setLoading] = useState(false)
  const [loadingError, setLoadingError] = useState<unknown>('')
  const [sideMenu, setSideMenu] = useState([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      try{
        const result = await fetchConfiguration()
        // console.log(result)
      } catch (e: unknown){
        console.log(e)
        setLoadingError(e)
        setLoading(false)
      }
      setLoading(false)
    }
    preload()
  }, [])

  return (
    <SimpleUIContext.Provider
      value={{loading, loadingError, sideMenu}}>
      {children}
    </SimpleUIContext.Provider>
  )
} 
export function useSimpleUI() {
  return useContext(SimpleUIContext)
}
