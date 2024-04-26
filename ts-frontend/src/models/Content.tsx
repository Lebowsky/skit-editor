import { contextTypes } from "./ContextConfiguration"

export interface IContent {
  id: number
  parentId: number
  contextType: contextTypes
  content: {type: string, [key: string]: string | boolean}
  elements?: IListContent[]
  handlers?: IContent[]
}

export interface IListContent {
  id: number
  parentId: number
  contextType: contextTypes
  content: {type: string, [key: string]: string | boolean}
  nestedElements: IListContent[]
}