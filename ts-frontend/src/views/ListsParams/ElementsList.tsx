/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from "react"
import ListView from "../../components/ListView"
import Button, { ButtonGroup } from "../../components/inputs/Button"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"


export default function ElementsList() {
  const [selectedItemId, setSelectedItemId] = useState<number|null>(null)
  const { currentContent, setDetails } = useSimpleUI() as IContextProviderData

  function onClickItem(id: number){
    setSelectedItemId(id)
  }
  function onDoubleClickItem(id: number, contextType: contextTypes){
    setDetails(id, contextType)
  }

  return (
    <ParamsBlockWrapper>
      <ParamsBlockTitle>{'Elements'}</ParamsBlockTitle>
      {currentContent && currentContent.elements && 
      <ListView
        data={currentContent.elements}
        listKeys={['type', 'Variable', 'Value']}
        selectedItemId={selectedItemId}
        onClickItem={onClickItem}
        onDoubleClickItem={onDoubleClickItem}
      ></ListView>}
    </ParamsBlockWrapper>
  )
}

interface ParamsBlockWrapperProrps {
  children: React.ReactNode
}
function ParamsBlockWrapper({ children }: ParamsBlockWrapperProrps) {
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

interface ParamsBlockTitleProps{
  children: React.ReactNode
  onClick?(): void
}
function ParamsBlockTitle({ children, onClick }: ParamsBlockTitleProps) {
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


