import CommonParamsForm from "../../components/forms/CommonParamsForm"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"
import { ParamsFields } from "../operationViews/OperationElements/ParamsHandlers"

export default function Common() {
  const { currentContextType, currentContent } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.common) return null
  console.log(currentContent)
  const fields: ParamsFields[] = [
    {name: 'ConfigurationName', type: 'text', title: 'Name'},
    {name: 'ConfigurationDescription', type: 'text', title: 'Description'},
    {name: 'ConfigurationVersion', type: 'text', title: 'Version'},
    {name: 'ConfigurationTags', type: 'text', title: 'Tags'},
  ]

  function handleSubmit(e: React.SyntheticEvent): void {
  }

  return (
    <>
    {currentContent && 
    <CommonParamsForm 
      fields={fields} 
      onSubmit={handleSubmit} 
      title={`Common`}/>}
    </>      
  )
}