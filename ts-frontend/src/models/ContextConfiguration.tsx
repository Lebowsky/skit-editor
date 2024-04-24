import { ConfigurationService } from "../services/configurationService"
import { ISideMenuItem } from "./SideMenu"

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
  content: { [key: string]: string }
}

export enum contextTypes{
  processes='processes',
  operations='operations',
  handlers='handlers',
  elements='elements'
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
  configurationService: ConfigurationService
}
