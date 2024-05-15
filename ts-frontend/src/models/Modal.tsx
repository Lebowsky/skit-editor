import { IButton } from "./Inputs"

export interface IModalError {
  title: string
  description?: string
  buttons?: IButton[]
}