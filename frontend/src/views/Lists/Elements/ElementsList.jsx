// import ParamsBlockWrapper from "../ParamsBlockWrapper";
// import Button, { ButtonGroup } from '../../Inputs/Button/Button';
// import ListView from '../../Inputs/ListView';
import Button, { ButtonGroup } from '../../../components/Inputs/Button/Button';
import ParamsBlockWrapper from '../../../components/forms/ParamsBlockWrapper';
import { useSimpleUI } from '../../../context/context';
import ListView from '../ListView';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function ElementsList({ data, title='Elements' }) {
  const { setCurrentDetails } = useSimpleUI()
  function onListClick(e) {
    console.log(e)
    // setCurrentDetails(null)
  }
  return (
    <ParamsBlockWrapper>
      <ParamsBlockTitle>{title}</ParamsBlockTitle>
      <ListView data={data} onClick={onListClick} listKeys={['type', 'Variable', 'Value']}></ListView>
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
        <Button onClick={onClick}>Add</Button>
        <Button onClick={onClick}>Paste</Button>
      </ButtonGroup>
    </div>
  )
}


