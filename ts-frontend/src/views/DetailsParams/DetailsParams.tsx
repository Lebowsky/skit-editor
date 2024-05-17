import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"
import ParamsBaseElement from "../operationViews/OperationElements/ParamsBaseElement"
import ParamsHandlers from "../operationViews/OperationElements/ParamsHandlers"
import ParamsLayoutElement from "../operationViews/OperationElements/ParamsLayoutElement"
import ParamsLinearLayout from "../operationViews/OperationElements/ParamsLinearLayout"

export default function DetailsParams() {
  const { currentDetails } = useSimpleUI() as IContextProviderData
  
  const detailsElementsTypes = {
    layout: ['LinearLayout', 'Tiles'],
    baseElement: ['barcode', 'fab', 'ManuItem'],
  }

  if (!currentDetails) return null

  const detailsType = currentDetails.contextType === contextTypes.handlers ? 
    'handlers' : 
    Object.entries(detailsElementsTypes).reduce((result, [key, types]) => {
      if (types.includes(currentDetails.content.type)) result = key
      return result
    }, 'layoutElement')


  return (
    <Params>
      {detailsType === "layout" && <ParamsLinearLayout/>}
      {detailsType === "baseElement" && <ParamsBaseElement/>}
      {detailsType === "layoutElement" && <ParamsLayoutElement/>}
      {detailsType === "handlers" && <ParamsHandlers/>}
    </Params>
  )
}

interface ParamsProps {
  children: React.ReactNode
}
export function Params({ children }: ParamsProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'start',
      width: '100%',
      maxWidth: '750px',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  )
}