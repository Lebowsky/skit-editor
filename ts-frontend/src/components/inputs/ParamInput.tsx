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
  required=true 
}: ParamInputProps) {
  return (
    <>
      {type === 'text' && <TextView value={value.toString()} name={name} title={title} required={required}></TextView>}
      {type === 'checkbox' && <CheckBox title={title} name={name} isChecked={Boolean(value)}></CheckBox>}
      {/* {type === 'select' && <Selector title={title} name={name} options={options} value={value}></Selector>} */}
    </>
  )
}
// export function getValue(param) {
//   switch (param.type) {
//     case 'text':
//       return param.value
//     case 'checkbox':
//       return param.checked
//     default:
//       return param.value
//   }
// }