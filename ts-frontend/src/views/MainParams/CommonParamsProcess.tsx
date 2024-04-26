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
//   const { updateCurrentContent } = useSimpleUI()
  const { currentContent } = useSimpleUI() as IContextProviderData
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
    console.log(fields[0].name)
    console.log(target.ProcessName.value)
    // console.log(target.DefineOnBackPressed.value)
    // console.log(target.hidden.value)
    // console.log(target.login_screen.value)

    // console.log(target[fields[0].name])

    // const newContent = Object.fromEntries(fields.map(el => ([el.name, getParamValue(form[el.name])])))
    // console.log(newContent)
//     updateCurrentContent({...data, ...newContent})
  }
  return (
    currentContent && 
    <CommonParamsForm 
      fields={fields} 
      onSubmit={handleSubmit} 
      title={`Process: ${currentContent.content.ProcessName}`}/>
  )
}

