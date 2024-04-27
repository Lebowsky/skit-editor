import { useState } from "react"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"
import ListView from "../ListView"
import Button, { ButtonGroup } from "../inputs/Button"

export default function HandlersList() {
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
    <ParamsBlockTitle>{'Handlers'}</ParamsBlockTitle>
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