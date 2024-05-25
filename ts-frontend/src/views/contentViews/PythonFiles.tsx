import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function PythonFiles() {
  const { currentContextType } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.pyFiles) return null

  return (
    <>
    <h1>Python files</h1>
    </>      
  )
}