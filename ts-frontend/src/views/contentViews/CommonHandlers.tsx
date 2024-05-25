import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function CommonHandlers() {
  const { currentContextType } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.commonHandlers) return null

  return (
    <>
    <h1>Common handlers</h1>
    </>      
  )
}