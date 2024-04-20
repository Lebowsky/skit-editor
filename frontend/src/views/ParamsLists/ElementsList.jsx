import { useState } from 'react';
import Button, { ButtonGroup } from '../../components/Inputs/Button';
import ListView from '../../components/ListView/ListView';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function ElementsList({ data, title='Elements' }) {
  const [selectedItemId, setSelectedItemId] = useState()

  function onClickItem(id){
    setSelectedItemId(id)
  }
  return (
    <ParamsBlockWrapper>
      <ParamsBlockTitle>{title}</ParamsBlockTitle>
      <ListView 
        data={data} 
        listKeys={['type', 'Variable', 'Value']} 
        selectedItemId={selectedItemId} 
        onClickItem={onClickItem}
      ></ListView>
    </ParamsBlockWrapper>
  )
}
export function ParamsBlockWrapper({ children }) {
  return (
    <div
      style={{
        margin: '0 1% 20px 1%',
        width: '100%',
        minWidth: '500px',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px #33333326',
      }}
    >
      {children}
    </div>
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
        <Button onClick={onClick}>Add</Button>
        <Button onClick={onClick}>Paste</Button>
      </ButtonGroup>
    </div>
  )
}


