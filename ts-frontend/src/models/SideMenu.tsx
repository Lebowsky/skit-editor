import { contextTypes } from "./ContextConfiguration"

export interface ISideMenuItem {
  id: number
  type: string
  contextType: contextTypes
  title: string
  nestedItems?: ISideMenuItem[]
  showInTabs: boolean
}
export interface ITabData{
  id: number
  type: string
  contextType: contextTypes
  title: string
  onClick?(): void
  onClose?(): void
}

export type ITabType = 'Process' | 'Operation' | 'CVOperation' | 'CVFrame'