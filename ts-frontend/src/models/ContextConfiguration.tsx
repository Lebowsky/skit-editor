import { ConfigurationService } from "../services/configurationService"
import { ISideMenuItem, ITabData } from "./SideMenu"
import { IContent, IDetailsContent } from "./Content"
import { modals } from "./Modals"
import { IModalError } from "./Modal"

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

export interface IAppData {
  uiPath: string
  workingDirPath?: string
  projectConfigPath?: string
}
export interface IContextProviderData {
  modal: modals | null
  setModal(modal: modals | null): void
  modalError: IModalError | null
  setModalError(error: IModalError): void
  loading: boolean
  loadingError: string | unknown
  sideMenu: ISideMenuItem[] | undefined
  configurationService: ConfigurationService
  setCurrentTab(tabId: number, type: string): void
  addTab(newTab: ITabData): void
  removeTab(tabId: number): void
  tabs: ITabData[]
  currentTabId: number
  currentContent: IContent | null
  updateContent(newContent: IContent): void
  currentDetails: IDetailsContent | null
  setDetails(id: number, contextType: contextTypes): void
  updateDetails(newDetails: IDetailsContent | null): void
  updateConfigurationService(data: {[key: string]: any}): void
  updateSideMenu(): void
  appData: IAppData | null
  setAppData(data: IAppData | null): void
}
