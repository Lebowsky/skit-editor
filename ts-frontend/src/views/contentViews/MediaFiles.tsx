import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function MediaFiles() {
  const { currentContextType } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.mediafiles) return null

  return (
    <>
    <h1>Media files</h1>
    </>      
  )
}