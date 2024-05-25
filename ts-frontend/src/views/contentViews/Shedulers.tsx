import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function Shedulers() {
  const { currentContextType } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.shedulers) return null

  return (
    <>
    <h1>Shedulers</h1>
    </>      
  )
}