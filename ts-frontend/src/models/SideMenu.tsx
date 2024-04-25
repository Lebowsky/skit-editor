export interface ISideMenuItem {
  id: number
  type: string
  title: string
  nestedItems?: ISideMenuItem[]
}
export interface ITabData{
  id: number
  type: string
  title: string
}

export type ITabType = 'Process' | 'Operation' | 'CVOperation' | 'CVFrame'