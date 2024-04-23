import TextView from "./TextView"
import CheckBox from "./CheckBox"
import Selector from "./Selector"

export default function ParamInput({ type, value, name, title, options, required=true }) {
  return (
    <>
      {type === 'text' && <TextView key={Math.random()} value={value} name={name} title={title} required={required}></TextView>}
      {type === 'checkbox' && <CheckBox title={title} name={name} isChecked={value}></CheckBox>}
      {type === 'select' && <Selector title={title} name={name} options={options} defaultValue={value}></Selector>}
    </>
  )
}
export function getValue(param) {
  switch (param.type) {
    case 'text':
      return param.value
    case 'checkbox':
      return param.checked
    default:
      return param.value
  }
}