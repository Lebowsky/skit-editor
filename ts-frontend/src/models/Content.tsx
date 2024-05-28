import { contextTypes } from "./ContextConfiguration"

export interface IContent {
  id: number
  contextType: contextTypes
  content: {[key: string]: string | boolean}
  elements?: IListContent[]
  handlers?: IListContent[]
}

export interface IListContent {
  id: number
  parentId: number
  contextType: contextTypes
  content: {[key: string]: string | boolean}
  nestedElements: IListContent[]
}

export interface IHandlersItem {
  event: string
  listener?: string
  action: string
  type: string
  method: string
  postExecute?: string
}

export interface IDetailsContent {
  id: number
  contextType: contextTypes
  content: {[key: string]: string | boolean}
}