import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"

export default function MainMenu() {
  const { currentContextType } = useSimpleUI() as IContextProviderData
  if (currentContextType !== contextTypes.mainMenu) return null

  return (
    <>
    <h1>Main menu</h1>
    </>      
  )
}