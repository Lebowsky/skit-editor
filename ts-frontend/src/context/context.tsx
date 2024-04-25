import React, { createContext, useContext, useEffect, useState } from "react";
import { IConfigurationContext } from '../models/ContextConfiguration'
import { fetchConfiguration } from '../api';
import { ConfigurationService } from '../services/configurationService'
import { getSideMenu } from '../utils'
import { ISideMenuItem, ITabData } from "../models/SideMenu";
import { IContextProviderData } from "../models/ContextConfiguration";

interface ContextProps {
  children: React.ReactNode
}

let configurationService = new ConfigurationService({})

const SimpleUIContext = createContext<IContextProviderData | null>(null)

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingError, setLoadingError] = useState<string | unknown>('')
  const [sideMenu, setSideMenu] = useState<ISideMenuItem[]>([])
  const [tabs, setTabs] = useState<ITabData[]>([])
  const [currentTabId, setCurrentTabId] = useState<number>(0)

  useEffect(() => {
    async function preload() {
      setLoading(true)
      try {
        const { ClientConfiguration: data }: {[key: string]: any} = await fetchConfiguration()
        configurationService = new ConfigurationService(data)
        const conf: IConfigurationContext = configurationService.getConfigurationContext()
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

  function addTab(newTab: ITabData): void {
    setTabs((prev) => {
      if (prev.findIndex(el => el.id === newTab.id) < 0)
        return [...(prev.map(el => ({ ...el }))), { ...newTab }]
      else return prev
    })
    setCurrentTab(newTab.id, newTab.type)
  }

  function setCurrentTab(tabId: number, type: string): void {

    function getContentType(type: string){
      switch (type){
        case 'CVOperation':
          return 'Process'
        case 'CVFrame':
          return 'Operation'
        default:
          return type
      }
    }
    
    setCurrentTabId(tabId)

    // setCurrentState((prev) => {
    //   const newContent = {
    //     ...prev,
    //     currentTab: tabId ? tabId : null,
    //     currentContent: type ? getCurrentContent(tabId, getContentType(type)) : null
    //   }
    //   setCurrentDetails(null)
    //   return newContent
    // })
  }

  function removeTab(tabId: number) {
    setTabs((prev) => {
      const tabIdx = prev.findIndex(el => el.id === tabId)
      const isActive = currentTabId === tabId
      const newTabs = prev.filter(el => el.id !== tabId)
      const currentTab = (newTabs.length && isActive) ? (newTabs[tabIdx - 1] || newTabs[newTabs.length - 1]) : undefined
      currentTab && setCurrentTab(currentTab.id, currentTab.type)
      newTabs.length === 0 && setCurrentTab(0, '')

      return newTabs
    })
  }

  return (
    <SimpleUIContext.Provider 
      value={{
        loading, 
        loadingError, 
        sideMenu,
        tabs,
        addTab,
        removeTab,
        currentTabId, 
        setCurrentTab, 
        configurationService
      }}>
      {children}
    </SimpleUIContext.Provider>
  )
}
export function useSimpleUI() {
  return useContext(SimpleUIContext)
}
