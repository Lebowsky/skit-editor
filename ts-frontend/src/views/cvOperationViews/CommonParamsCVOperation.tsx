import CommonParamsForm from "../../components/forms/CommonParamsForm"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"


export default function CommonParamsCVOperation() {
  const { currentContent, updateContent } = useSimpleUI() as IContextProviderData
  const fields = [
    {name: 'CVOperationName', type: 'text', title: 'Name'},
    {name: 'hidden', type: 'checkbox', title: 'Do not display in Menu'},
  ]

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      CVOperationName: {value: string}
      hidden: {checked: boolean}
    }
    const newContent = {
      CVOperationName: target.CVOperationName.value,
      hidden: target.hidden.checked,
    }
    currentContent && updateContent({...currentContent, content: {...currentContent.content, ...newContent}})
  }
  return (
    currentContent && 
    <CommonParamsForm 
      fields={fields} 
      onSubmit={handleSubmit} 
      title={`SV: ${currentContent.content.Name}`}/>
  )
}