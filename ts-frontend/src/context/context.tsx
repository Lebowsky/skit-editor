import React, { createContext, useContext, useEffect, useState } from "react";
import { IAppData, IConfigurationContext, contextTypes } from '../models/ContextConfiguration'
import { fetchConfiguration } from '../api';
import { ConfigurationService } from '../services/configurationService'
import { ISideMenuItem, ITabData } from "../models/SideMenu";
import { IContextProviderData } from "../models/ContextConfiguration";
import { IContent, IDetailsContent } from "../models/Content";
import { modals } from "../models/Modals";
import { IModalError } from "../models/Modal";

interface ContextProps {
  children: React.ReactNode
}

export let configurationService = new ConfigurationService({})

const SimpleUIContext = createContext<IContextProviderData | null>(null)

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingError, setLoadingError] = useState<string | unknown>('')
  const [sideMenu, setSideMenu] = useState<ISideMenuItem[]>([])
  const [tabs, setTabs] = useState<ITabData[]>([])
  const [currentTabId, setCurrentTabId] = useState<number>(0)
  const [currentContent, setCurrentContent] = useState<IContent | null>(null)
  const [currentDetails, setCurrentDetails] = useState<IDetailsContent | null>(null)
  const [modal, setModal] = useState<modals | null>(modals.startScreen)
  const [modalError, setModalError] = useState<IModalError | null>(null)
  const [appData, setAppData] = useState<IAppData | null>(null)

  useEffect(() => {
    updateSideMenu()
  }, [])

  function updateConfigurationService(data: {[key: string]: any}){
    configurationService = new ConfigurationService(data)
  }

  function updateSideMenu() {
    const conf: IConfigurationContext = configurationService.getConfigurationContext()
    setSideMenu(configurationService.getSideMenu(conf.processes, conf.operations))
  }

  function addTab(newTab: ITabData): void {
    setTabs((prev) => {
      if (prev.findIndex(el => el.id === newTab.id) < 0)
        return [...(prev.map(el => ({ ...el }))), { ...newTab }]
      else return prev
    })
    setCurrentTab(newTab.id, newTab.contextType)
  }

  function setCurrentTab(tabId: number, type: contextTypes): void {
    setCurrentTabId(tabId)
    const content = configurationService.getItemContent(tabId, type)
    content && setCurrentContent(content)
  }

  function removeTab(tabId: number) {
    setTabs((prev) => {
      const tabIdx = prev.findIndex(el => el.id === tabId)
      const isActive = currentTabId === tabId
      const newTabs = prev.filter(el => el.id !== tabId)
      const currentTab = (newTabs.length && isActive) ? (newTabs[tabIdx - 1] || newTabs[newTabs.length - 1]) : undefined
      currentTab && setCurrentTab(currentTab.id, currentTab.contextType)
      newTabs.length === 0 && setCurrentTabId(0)

      return newTabs
    })
  }

  function updateContent(newContent: IContent){
    setCurrentContent(newContent)
    configurationService.updateItemContent(newContent)
  }

  function setDetails(id: number, contextType: contextTypes): void{
    const details = configurationService.getItemContent(id, contextType)
    updateDetails(details)
  }

  function updateDetails(newDetails: IDetailsContent){
    setCurrentDetails(newDetails)
    newDetails && configurationService.updateItemContent(newDetails)
  }

  return (
    <SimpleUIContext.Provider 
      value={{
        modal,
        setModal,
        modalError,
        setModalError,
        loading, 
        loadingError, 
        sideMenu,
        tabs,
        addTab,
        removeTab,
        currentTabId, 
        setCurrentTab, 
        configurationService,
        currentContent,
        updateContent,
        currentDetails,
        setDetails,
        updateDetails,
        updateConfigurationService,
        updateSideMenu,
        appData,
        setAppData
      }}>
      {children}
    </SimpleUIContext.Provider>
  )
}
export function useSimpleUI() {
  return useContext(SimpleUIContext)
}
