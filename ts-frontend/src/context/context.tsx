import React, { createContext, useContext, useEffect, useState } from "react";
import { IConfigurationContext } from '../models/ContextConfiguration'
import { fetchConfiguration } from '../api';
import { ConfigurationService } from '../services/configurationService'
import { getSideMenu } from '../utils'
import { ISideMenuItem } from "../models/SideMenu";
import { IContextProviderData } from "../models/ContextConfiguration";

interface ContextProps {
  children: React.ReactNode
}

const SimpleUIContext = createContext<IContextProviderData | null>(null)

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingError, setLoadingError] = useState<string | unknown>('')
  const [sideMenu, setSideMenu] = useState<ISideMenuItem[]>()

  useEffect(() => {
    async function preload() {
      setLoading(true)
      try {
        const result = await fetchConfiguration()
        const { ClientConfiguration: data }: {[key: string]: any} = result
        const configurationsService = new ConfigurationService(data)
        const conf: IConfigurationContext = configurationsService.getConfigurationContext()
        setSideMenu(getSideMenu(conf.processes, conf.operations))

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
    <SimpleUIContext.Provider value={{loading, loadingError, sideMenu}}>
      {children}
    </SimpleUIContext.Provider>
  )
}
export function useSimpleUI() {
  return useContext(SimpleUIContext)
}
