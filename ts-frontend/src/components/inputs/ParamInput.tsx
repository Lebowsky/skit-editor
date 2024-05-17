import TextView from "./TextView"
import CheckBox from "./CheckBox"
import Selector from "./Selector"
import { ParamInputProps } from "../../models/Inputs"


export default function ParamInput({
  type, 
  value, 
  name, 
  title, 
  options, 
  required=false,
  onChange 
}: ParamInputProps) {
  return (
    <>
      {type === 'text' && <TextView value={value ? value.toString(): ''} name={name} title={title} required={required} onChange={onChange}></TextView>}
      {type === 'checkbox' && <CheckBox title={title} name={name} isChecked={Boolean(value)}></CheckBox>}
      {type === 'select' && options && <Selector title={title} name={name} options={options} value={value ? value.toString(): ''} onChange={onChange}></Selector>}
    </>
  )
}
