import Modal from "../../components/layouts/Modal"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData, contextTypes } from "../../models/ContextConfiguration"
import { uuid } from "../../utils"
import ParamsBaseElement from "../operationViews/OperationElements/ParamsBaseElement"
import ParamsHandlers from "../operationViews/OperationElements/ParamsHandlers"
import ParamsLayoutElement from "../operationViews/OperationElements/ParamsLayoutElement"
import ParamsLinearLayout from "../operationViews/OperationElements/ParamsLinearLayout"

export default function DetailsParams() {
  const { currentDetails, updateDetails } = useSimpleUI() as IContextProviderData

  const detailsElementsTypes = {
    layout: ['LinearLayout', 'Tiles'],
    baseElement: ['barcode', 'fab', 'ManuItem'],
  }

  if (!currentDetails) return null

  const detailsType = currentDetails.contextType === contextTypes.handlers ?
    'handlers' :
    Object.entries(detailsElementsTypes).reduce((result, [key, types]) => {
      if (currentDetails.content.type && types.includes(currentDetails.content.type.toString())) result = key
      return result
    }, 'layoutElement')

  function canCloseDetails(): boolean {
    if (window.confirm("Dont save?")) {
      updateDetails(null)
      return true
    }
    return false
  }

  return (
    <Modal allowClose={canCloseDetails} key={uuid()}>
      <Params>
        {detailsType === "layout" && <ParamsLinearLayout />}
        {detailsType === "baseElement" && <ParamsBaseElement />}
        {detailsType === "layoutElement" && <ParamsLayoutElement />}
        {detailsType === "handlers" && <ParamsHandlers />}
      </Params>
    </Modal>
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