import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function Common() {
  const { currentContextType, currentContent } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.common) return null
  console.log(currentContent)
  return (
    <>
    <h1>Common</h1>
    </>      
  )
}