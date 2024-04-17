import Button, { ButtonGroup } from "../../../components/Inputs/Button/Button"
import CheckBox from "../../../components/Inputs/CheckBox/CheckBox"
import TextView from "../../../components/Inputs/TextView/TextView"
import ParamsBlockWrapper from "../../../components/forms/ParamsBlockWrapper"


export default function ParamsProcess({ data }) {
  return (
    <ParamsBlockWrapper>
      <ParamsBlockTitle onClick={() => ({})}>{`Process: ${data.ProcessName}`}</ParamsBlockTitle>
      <TextView
        value={data.ProcessName}
        key={Math.random()}
        name={'ProcessName'}
        variable='name'
        title='Name'
      ></TextView>
      <CheckBox title='Override back button (ON_BACK_PRESSED input event)' isChecked={data.DefineOnBackPressed}></CheckBox>
      <CheckBox title='Do not display in Menu' isChecked={data.hidden}></CheckBox>
      <CheckBox title='Run at startup' isChecked={data.login_screen}></CheckBox>
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
        <Button onClick={onClick}>Apply</Button>
      </ButtonGroup>
    </div>
  )
}
