interface InputType {
  value: string
  name: string
  title: string
}

export interface ITextView extends InputType{
  variable?: string
  required?: boolean
}

export interface ICheckBox{
  title: string
  isChecked: boolean
  name: string
}

export interface ISelector extends InputType{
  options: []
}

export interface IButton {

}

export interface ParamInputProps {
  type: string
  value: string
  name: string
  title: string
  options?: []
  required?: boolean
}