export interface InputFieldType {
  value?: string
  name: string
  type: string
  title: string
}

export interface ITextView{
  value?: string
  variable?: string
  name: string
  required?: boolean
  title: string
}

export interface ICheckBox{
  title: string
  isChecked: boolean
  name: string
}

export interface ISelector{
  value?: string
  name: string
  title: string
  options: {[key: string]: string | boolean}
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void
}

export interface IButton {
  text: string
  onClick(): void
}

export interface ParamInputProps {
  type: string
  value: string | boolean
  name: string
  title: string
  options?: {}
  required?: boolean
  onChange?(): void
}