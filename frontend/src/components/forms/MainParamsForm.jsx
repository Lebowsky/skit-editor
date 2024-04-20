import Button, { ButtonGroup } from "../Inputs/Button";
import ParamInput from "../Inputs/ParamInput";

export default function MainParamsForm({ data, fields, onSubmit, title }) {
  return (
    <ParamsFormWrapper onSubmit={onSubmit}>
      <ParamsBlockTitle>{title}</ParamsBlockTitle>
      {fields.map((el, idx) => (<ParamInput {...el} value={data[el.name]} key={idx} />))}
    </ParamsFormWrapper>
  )
}
function ParamsFormWrapper({ onSubmit, children }) {
  return (
    <form
      style={{
        margin: '0 1% 20px 1%',
        width: '100%',
        minWidth: '500px',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px #33333326',
      }}
      onSubmit={onSubmit}>
      {children}
    </form>
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
      <h3>{children}</h3>
      <ButtonGroup>
        <Button onClick={onClick} type='apply'>Apply</Button>
      </ButtonGroup>
    </div>
  )
}

export function getParamValue(param) {
  switch (param.type) {
    case 'text':
      return param.value
    case 'checkbox':
      return param.checked
    default:
      return param.value
  }
}