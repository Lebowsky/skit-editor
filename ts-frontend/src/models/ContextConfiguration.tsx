
export interface IContextConfiguration {
  root: {}
  Process: [IProcess]
  Operation: [IOperations]
  // elements: []
  // handlers: []
  // pyFiles: []
  // timers: []
  // commonHandlers: []
  // mediaFiles: []
  // mainMenu: []
  // styleTemplates: []
  // configurationSettings: {}
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