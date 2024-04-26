import { Dispatch, SetStateAction } from "react"
import { ConfigurationService } from "../services/configurationService"
import { ISideMenuItem, ITabData } from "./SideMenu"
import { IContent, IDetailsContent } from "./Content"

export interface IConfigurationContext {
  root: {}
  processes: IListItem[]
  operations: IListItem[]
  elements: IListItem[]
  handlers: IListItem[]
  // pyFiles: []
  // timers: []
  // commonHandlers: []
  // mediaFiles: []
  // mainMenu: []
  // styleTemplates: []
  // configurationSettings: {}
}

export interface IListItem {
  id: number
  parentId: number
  contextType: contextTypes
  content: {type: string, [key: string]: string }
}

export enum contextTypes{
  processes='processes',
  operations='operations',
  handlers='handlers',
  elements='elements',
  mainMenu='mainMenu',
  styleTemplates='styleTemplates',
  startScreen='startScreen',
  shedulers='shedulers',
  commonHandlers='commonHandlers',
  pyFiles='pyFiles',
  mediafiles='mediafiles'
}

export interface IProcess {
  ProcessName: string
  DefineOnBackPressed: boolean
  hidden: boolean
  login_screen: boolean
}

export interface IOperations{
  Name: string
  hideToolBarScreen: boolean
  hideBottomBarScreen: boolean
  noScroll: boolean
  noConfirmation: boolean
}
export interface IContextProviderData {
  loading: boolean;
  loadingError: string | unknown;
  sideMenu: ISideMenuItem[] | undefined;
  configurationService: ConfigurationService;
  setCurrentTab(tabId: number, type: string): void;
  addTab(newTab: ITabData): void
  removeTab(tabId: number): void
  tabs: ITabData[]
  currentTabId: number
  currentContent: IContent | null
  updateContent(newContent: IContent): void,
  currentDetails: IDetailsContent | null
  setDetails(id: number, contextType: contextTypes): void
}
