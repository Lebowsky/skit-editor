import Button, { ButtonGroup } from "../Inputs/Button"
import ParamInput from "../Inputs/ParamInput"

export default function ModalParamsForm({ data, fields, onSubmit, title }) {
  return (
    <ParamsFormWrapper onSubmit={onSubmit}>
      <ParamsBlockTitle>{title}</ParamsBlockTitle>
      {fields.map((el, idx) => (<ParamInput {...el} value={data.content[el.name]} key={idx} />))}
    </ParamsFormWrapper>
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
function ParamsFormWrapper({ onSubmit, children }) {
  return (
    <form
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderRadius: '5px',
      }}
      onSubmit={onSubmit}>
      {children}
    </form>
  )
}