import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function StyleTemplates() {
  const { currentContextType } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.styleTemplates) return null

  return (
    <>
    <h1>Styles</h1>
    </>      
  )
}