import CommonParamsForm from "../../components/forms/CommonParamsForm"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"


export default function CommonParamsOperation() {
  const { currentContent, updateContent } = useSimpleUI() as IContextProviderData
  const fields = [
    {name: 'Name', type: 'text', title: 'Name'},
    {name: 'hideToolBarScreen', type: 'checkbox', title: 'Hide top bar'},
    {name: 'hideBottomBarScreen', type: 'checkbox', title: 'Hide button bar'},
    {name: 'noScroll', type: 'checkbox', title: 'Disable scrolling for Root Layout'},
    {name: 'noConfirmation', type: 'checkbox', title: 'Close without confirmation'},
  ]

  function handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      Name: {value: string}
      hideToolBarScreen: {checked: boolean}
      hideBottomBarScreen: {checked: boolean}
      noScroll: {checked: boolean}
      noConfirmation: {checked: boolean}
    }
    const newContent = {
      Name: target.Name.value,
      hideToolBarScreen: target.hideToolBarScreen.checked,
      hideBottomBarScreen: target.hideBottomBarScreen.checked,
      noScroll: target.noScroll.checked,
      noConfirmation: target.noConfirmation.checked,
    }
    currentContent && updateContent({...currentContent, content: {...currentContent.content, ...newContent}})
  }

  return (
    currentContent && 
    <CommonParamsForm 
      fields={fields} 
      onSubmit={handleSubmit} 
      title={`Screen: ${currentContent.content.Name}`}/>
  )
}

