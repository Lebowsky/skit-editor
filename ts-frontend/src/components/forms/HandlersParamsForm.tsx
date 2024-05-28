import { decode, encode } from 'js-base64'

import { useState } from "react"
import ModalTabs from "../tabs/ModalTabs"
import Button, { ButtonGroup } from "../inputs/Button"
import ParamInput from "../inputs/ParamInput"
import HandlersCodeEditor from "../../views/HandlersCodeEditor"
import { IFormData, ParamsFields } from '../../views/operationViews/OperationElements/ParamsHandlers'

type IFormDataKeys = keyof IFormData

interface HandlersParamsFormProps {
  fields: { [key: string]: ParamsFields }
  onSubmit(e: React.FormEvent): void
  title: string
  formData: IFormData
  setFormData(key: string, value: string): void
}
export enum tabContentType {
  common = 'common',
  source = 'source',
  postExecute = 'postExecute'
}

export default function HandlersParamsForm({ fields, onSubmit, title, formData, setFormData }: HandlersParamsFormProps) {
  const [currentTabId, setCurrentTabId] = useState<number>(0)
  const [formContent, setFormContent] = useState<tabContentType>(tabContentType.common)

  function onClickTab(id: number, contentType: tabContentType) {
    setCurrentTabId(id)
    setFormContent(contentType)
  }

  function onChangeCode(value: string) {
    setFormData('source', encode(value))
  }

  function onChangePostExecute(value: string) {
    setFormData('postExecute', value)
  }
  const tabsData = [
    { id: 0, title: 'Common', onClick: () => { onClickTab(0, tabContentType.common) } },
    { id: 1, title: 'Source', onClick: () => { onClickTab(1, tabContentType.source) } },
    // { id: 2, title: 'Post execute', onClick: () => { onClickTab(2, tabContentType.postExecute) } }
  ]
  const postExecuteDefault =
    JSON.stringify(
      [{
        "action": "run",
        "type": "python",
        "method": "method",
        "postExecute": [{
          "action": "run",
          "type": "python",
          "method": "method",
          "postExecute": []
        }]
      }], null, 4)

  return (
    <ParamsFormWrapper onSubmit={onSubmit}>
      <ParamsBlockTitle tabsData={tabsData} currentTabId={currentTabId}>{title}</ParamsBlockTitle>
      <>
        {formContent === 'common' && Object.values(fields).map((el, idx) => (!el.hidden &&
          <ParamInput {...el} value={formData[el.name as IFormDataKeys] || ''} key={idx} />
        ))}
        {formContent === 'source' &&
          <HandlersCodeEditor
            language="python"
            content={decode(formData.source.toString())}
            onChange={onChangeCode}
          />
        }
        {formContent === 'postExecute' &&
          <HandlersCodeEditor
            language="json"
            content={formData.postExecute ? formData.postExecute : postExecuteDefault}
            onChange={onChangePostExecute}
          />
        }
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
