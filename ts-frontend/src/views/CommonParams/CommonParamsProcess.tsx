import CommonParamsForm from "../../components/forms/CommonParamsForm"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"


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
      DefineOnBackPressed: {checked: boolean}
      hidden: {checked: boolean}
      login_screen: {checked: boolean}
    }

    const newContent = {
      ProcessName: target.ProcessName.value,
      DefineOnBackPressed: target.DefineOnBackPressed.checked,
      hidden: target.hidden.checked,
      login_screen: target.login_screen.checked,
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

