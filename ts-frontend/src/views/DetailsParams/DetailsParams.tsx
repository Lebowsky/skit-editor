import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"
import ParamsLinearLayout from "./LinearLayout/ParamsLinearLayout"

export default function DetailsParams() {
  const { currentDetails } = useSimpleUI() as IContextProviderData

  return (
    <Params>
      {currentDetails && currentDetails.content.type === "LinearLayout" && <ParamsLinearLayout/>}
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
      maxWidth: '550px',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  )
}