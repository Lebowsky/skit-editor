import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function StartScreen() {
  const { currentContextType } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.startScreen) return null

  return (
    <>
    <h1>Start screen</h1>
    </>      
  )
}