import { useState } from "react"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"
import ModalTabs from "../tabs/ModalTabs"
import Button, { ButtonGroup } from "../inputs/Button"
import ParamInput from "../inputs/ParamInput"
import HandlersCodeEditor from "../../views/HandlersCodeEditor"

interface ParamsFields {
  name: string
  type: string
  title: string
  options?: { [key: string]: string | boolean }
}
interface HandlersParamsFormProps {
  fields: ParamsFields[],
  onSubmit(e: React.FormEvent): void
  title: string
}
export enum tabContentType{
  common='common',
  source='source',
  postExecute='postExecute'
}

export default function HandlersParamsForm({ fields, onSubmit, title }: HandlersParamsFormProps) {
  const { currentDetails } = useSimpleUI() as IContextProviderData
  const [currentTabId, setCurrentTabId] = useState<number>(0)
  const [formContent, setFormContent] = useState<tabContentType>(tabContentType.common)

  function onClickTab(id: number, contentType: tabContentType) {
    setCurrentTabId(id)
    setFormContent(contentType)
  }

  const tabsData = [
    { id: 0, title: 'Common', onClick: () => { onClickTab(0, tabContentType.common) } },
    { id: 1, title: 'Source', onClick: () => { onClickTab(1, tabContentType.source) } },
    { id: 2, title: 'Post execute', onClick: () => { onClickTab(2, tabContentType.postExecute) } }
  ]

  return (
    currentDetails && <ParamsFormWrapper onSubmit={onSubmit}>
      <ParamsBlockTitle tabsData={tabsData} currentTabId={currentTabId}>{title}</ParamsBlockTitle>
      <>
        {formContent === 'common' && fields.map((el, idx) => (
          <ParamInput {...el} value={currentDetails.content[el.name] || ''} key={idx} />
        ))}
        {formContent === 'source' && <HandlersCodeEditor language="python" content={decodeURIComponent(escape(atob(currentDetails.content?.method.toString())))}/>}
        {formContent === 'postExecute' && <HandlersCodeEditor language="json" content=""/>}
      </>
    </ParamsFormWrapper>
  )
}

interface ParamsFormWrapperProps {
  onSubmit(e: React.FormEvent): void
  children: React.ReactNode
}
function ParamsFormWrapper({ onSubmit, children }: ParamsFormWrapperProps) {
  return (
    <form
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderRadius: '5px',
        minWidth: 720,
      }}
      onSubmit={onSubmit}>
      {children}
    </form>
  )
}

interface ParamsBlockTitleProps {
  children: React.ReactNode
  tabsData: { id: number, title: string, onClick(): void }[]
  currentTabId: number
}
function ParamsBlockTitle({ children, tabsData, currentTabId }: ParamsBlockTitleProps) {
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
      <ModalTabs tabsData={tabsData} currentTabId={currentTabId} ></ModalTabs>
      <ButtonGroup>
        <Button>Apply</Button>
      </ButtonGroup>
    </div>
  )
}

