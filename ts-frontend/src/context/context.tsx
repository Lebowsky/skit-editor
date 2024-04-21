import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchConfiguration } from '../api';
import { convertConfiguration, getSideMenu } from '../utils'
import {IContextConfiguration} from '../models/ContextConfiguration'

const SimpleUIContext = createContext({})

interface ContextProps {
  children: React.ReactNode
}

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [configuration, setConfiguration] = useState<IContextConfiguration>()
  const [loading, setLoading] = useState(false)
  const [loadingError, setLoadingError] = useState<unknown>('')
  const [sideMenu, setSideMenu] = useState<any[]>([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      try {
        const result = await fetchConfiguration()
        const { ClientConfiguration: data } = result
        const conf: IContextConfiguration = convertConfiguration(data)
        setSideMenu(getSideMenu(conf.Process, conf.Operation))
        // setConfiguration(conf)

      } catch (e: unknown) {
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
      value={{ loading, loadingError, sideMenu }}>
      {children}
    </SimpleUIContext.Provider>
  )
}
export function useSimpleUI() {
  return useContext(SimpleUIContext)
}
