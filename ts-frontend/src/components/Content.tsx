import { useSimpleUI } from "../context/context"
import { IContextProviderData, contextTypes } from "../models/ContextConfiguration"
import ParamsProcess from "../views/ParamsProcess"
import Tabs from "./Tabs"


export default function Content() {
  const { tabs, currentTabId, currentContent } = useSimpleUI() as IContextProviderData
  return (
    <div style={{
      width: '85%',
      overflow: 'auto'
    }}>
      <Tabs tabsData={tabs} currentTabId={currentTabId} />
      <ParamsWrapper>
        <></>
        {currentContent && currentContent.contextType === contextTypes.processes && <ParamsProcess/>}
        {/* {currentContent && currentContent.content.type === 'Operation' && <ParamsOperation {...currentContent}></ParamsOperation>} */}
        {/* {currentContent && currentContent.content.type === 'CVOperation' && <ParamsCVOperation {...currentContent}></ParamsCVOperation>} */}
        {/* {currentContent && currentContent.content.type === 'CVFrame' && <ParamsCVFrame {...currentContent}></ParamsCVFrame>} */}
      </ParamsWrapper>
    </div>
  )
}

interface ParamsWrapperProps{
  children: React.ReactNode
}
function ParamsWrapper({ children }: ParamsWrapperProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'start',
        marginTop: '60px'
      }}
    >
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'start',
        width: '100%',
        maxWidth: '700px',
        flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  )
}