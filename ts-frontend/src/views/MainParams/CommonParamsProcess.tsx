import CommonParamsForm from "../../components/forms/CommonParamsForm"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"
import { getParamValue } from "../../utils"
// import { useSimpleUI } from "../../context/context"


interface ParamsFields {
  name: string
  type: string
  title: string
}

export default function CommonParamsProcess() {
  const { currentContent, updateContent } = useSimpleUI() as IContextProviderData
  const fields: ParamsFields[] = [
    {name: 'ProcessName', type: 'text', title: 'Name'},
    {name: 'DefineOnBackPressed', type: 'checkbox', title: 'Override back button (ON_BACK_PRESSED input event)'},
    {name: 'hidden', type: 'checkbox', title: 'Do not display in Menu'},
    {name: 'login_screen', type: 'checkbox', title: 'Run at startup'},
  ]

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ProcessName: {value: string}
      DefineOnBackPressed: {value: string}
      hidden: {value: string}
      login_screen: {value: string}
    }

    const newContent = {
      ProcessName: target.ProcessName.value,
      DefineOnBackPressed: target.DefineOnBackPressed.value,
      hidden: target.hidden.value,
      login_screen: target.login_screen.value,
    }

    currentContent && updateContent({...currentContent, content: {...currentContent.content, ...newContent}})
  }
  return (
    currentContent && 
    <CommonParamsForm 
      fields={fields} 
      onSubmit={handleSubmit} 
      title={`Process: ${currentContent.content.ProcessName}`}/>
  )
}

