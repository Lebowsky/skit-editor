import React, { createContext, useContext, useEffect, useState } from "react";
import { IConfigurationContext } from '../models/ContextConfiguration'
import { fetchConfiguration } from '../api';
import { ConfigurationService } from '../services/configurationService'
// import { convertConfiguration, getSideMenu } from '../utils'

const SimpleUIContext = createContext({})

interface ContextProps {
  children: React.ReactNode
}

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [configuration, setConfiguration] = useState<IConfigurationContext>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingError, setLoadingError] = useState<string | unknown>('')
  const [sideMenu, setSideMenu] = useState<[]>([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      try {
        const result = await fetchConfiguration()
        const { ClientConfiguration: data }: {[key: string]: any} = result
        const service = new ConfigurationService(data)
        const conf: IConfigurationContext = service.getConfigurationContext()
        console.log(conf)
        // setSideMenu(getSideMenu(conf.Process, conf.Operation))
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
    <SimpleUIContext.Provider value={{}}>
      {children}
    </SimpleUIContext.Provider>
  )
}
export function useSimpleUI() {
  return useContext(SimpleUIContext)
}
