import Button, { ButtonGroup } from "../Inputs/Button/Button";
import CheckBox from "../Inputs/CheckBox/CheckBox";
import TextView from "../Inputs/TextView/TextView";
import ParamsBlockWrapper from "./ParamsBlockWrapper";

export default function MainParamsForm({ data, fields, onSubmit }) {
	return (
		<ParamsBlockWrapper onSubmit={onSubmit}>
			<ParamsBlockTitle onClick={() => ({})}>{`Process: ${data.ProcessName}`}</ParamsBlockTitle>
			{fields.map((el, idx) => (<ParamInput {...el} value={data[el.name]} key={idx}/>))}
		</ParamsBlockWrapper>
	)
}
function ParamsBlockTitle({ children, onClick }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        marginBottom: '10px',
        width: '100%',
        alignItems: 'baseline'
      }}>
      <h3 className="list-header">{children}</h3>
      <ButtonGroup>
        <Button onClick={onClick} type='apply'>Apply</Button>
      </ButtonGroup>
    </div>
  )
}
function ParamInput({type, value, name, title}){
	return (
		<>
			{type === 'text' && <TextView key={Math.random()} value={value}  name={name} title={title}></TextView>}
			{type === 'checkbox' && <CheckBox title={title} name={name} isChecked={value}></CheckBox>}
		</>
	)
}
export function getParamValue(param) {
	switch (param.type) {
		case 'text':
			return param.value
		case 'checkbox':
			return param.checked
		default:
			return null
	}
}