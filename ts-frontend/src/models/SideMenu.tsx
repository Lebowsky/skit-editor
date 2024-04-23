export interface ISideMenuItem {
  id?: number
  type: string
  title: string
  nestedItems?: ISideMenuItem[]
}