import { createContext, useContext, useEffect, useState } from "react";
import { fetchConfiguration } from '../api'
import { convertConfiguration, getSideMenu } from '../utils'

const SimpleUIContext = createContext({
  sideMenu: [],
  tabs: [],
  configuration: {},
  currentState: {
    currentTab: null,
    currentContent: null,
    currentDetails: null,
  }
})

export function SimpleUIContextProvider({ children }) {
  const [configuration, setConfiguration] = useState([])
  const [sideMenu, setSideMenu] = useState([])
  const [tabs, setTabs] = useState([])
  const [currentState, setCurrentState] = useState([])


  useEffect(() => {
    async function preload() {
      const { ClientConfiguration: data } = await fetchConfiguration()
      const conf = convertConfiguration(data)
      setConfiguration(conf)
      setSideMenu(getSideMenu(conf.Process, conf.Operation))
      setTabs([])
      setCurrentState({
        currentTab: null,
        currentContent: null,
        currentDetails: null
      })
    }
    preload()
  }, [])

  function getCurrentContent(id, type) {
    function getElements(parentId) {
      return configuration.elements
        .filter(el => el.parentId === parentId)
        .map(el => ({ ...el, nestedElements: getElements(el.id) }))
    }

    const newContent = { ...configuration[type]?.filter(el => el.id === id)?.[0] }
    newContent['elements'] = getElements(id)
    newContent['handlers'] = configuration.handlers.filter(el => el.parentId === id)
    return newContent
  }

  function updateCurrentContent(data) {
    setCurrentState((prev) => {
      const newContent = { ...prev }
      newContent.currentContent.content = data
      return newContent
    })
  }

  function setCurrentTab(tabId, type) {
    function getContentType(type){
      switch (type){
        case 'CVOperation':
          return 'Process'
        case 'CVFrame':
          return 'Operation'
        default:
          return type
      }

    }

    setCurrentState((prev) => {
      const newContent = {
        ...prev,
        currentTab: tabId ? tabId : null,
        currentContent: type ? getCurrentContent(tabId, getContentType(type)) : null
      }
      setCurrentDetails(null)
      return newContent
    })
  }

  function setCurrentDetails(data) {
    setCurrentState((prev) => {
      const newContent = { ...prev, currentDetails: {...data} }
      newContent.currentDetails = data
      return newContent
    })
  }

  function addTab(newTab) {
    setTabs((prev) => {
      if (prev.findIndex(el => el.id === newTab.id) < 0)
        return [...(prev.map(el => ({ ...el }))), { ...newTab }]
      else return prev
    })
    setCurrentTab(newTab.id, newTab.type)
  }

  function removeTab(tabId) {
    setTabs((prev) => {
      const tabIdx = prev.findIndex(el => el.id === tabId)
      const isActive = currentState.currentTab === tabId
      const newTabs = prev.filter(el => el.id !== tabId)
      const currentTab = (newTabs.length && isActive) ? (newTabs[tabIdx - 1] || newTabs[newTabs.length - 1]) : undefined
      currentTab && setCurrentTab(currentTab.id, currentTab.type)
      newTabs.length === 0 && setCurrentTab(null, null)

      return newTabs
    })
  }

  function updateConfigItem(id, type, content) {
    setConfiguration(prev => {
      const item = prev[type].filter(el => el.id === id)?.[0]
      item.content = content
      return prev
    })
    setCurrentState((prev) => {
      const item = prev.currentContent[type].filter(el => el.id === id)?.[0]
      item.content = content
      const newContent = {
        ...prev,
        // currentContent: type ? getCurrentContent(id, type) : null
      }
      return newContent
    })
  }

  return (
    <SimpleUIContext.Provider
      value={{
        configuration,
        sideMenu,
        tabs,
        currentState,
        addTab,
        removeTab,
        setCurrentTab,
        setCurrentDetails,
        updateCurrentContent,
        updateConfigItem
      }}>
      {children}
    </SimpleUIContext.Provider>
  )
}

export default SimpleUIContext

export function useSimpleUI() {
  return useContext(SimpleUIContext)
}