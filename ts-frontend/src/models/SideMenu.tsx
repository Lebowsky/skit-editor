export interface ISideMenuItem {
  id?: number
  type: string
  title: string
  nestedItems?: ISideMenuItem[]
}
export interface ITabData{
  id: number
  type: 'Process' | 'Operation' | string
  title: string
}