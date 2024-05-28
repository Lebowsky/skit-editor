export type dataType = IMainMenu | IProcess

export interface IMainMenu {
  MenuId: string,
  MenuItem: string,
  MenuTitle: string,
  MenuTop: boolean
}

export interface IProcess {
  type: string,
  ProcessName: string,
  DefineOnBackPressed: boolean,
  hidden: boolean,
  login_screen: boolean,
}