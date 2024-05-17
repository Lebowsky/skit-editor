import { useSimpleUI } from "../context/context"
import { IContextProviderData } from "../models/ContextConfiguration"
import ParamsCVFrame from "../views/cvFrameViews/ParamsCVFrame"
import ParamsCVOperation from "../views/cvOperationViews/ParamsCVOperation"
import ParamsOperation from "../views/operationViews/ParamsOperation"
import ParamsProcess from "../views/processViews/ParamsProcess"
import MainTabs from "./tabs/MainTabs"


export default function Content() {
  const { tabs, currentTabId, currentContent } = useSimpleUI() as IContextProviderData
  return (
    <div style={{
      width: '85%',
      overflow: 'auto'
    }}>
      <MainTabs tabsData={tabs} currentTabId={currentTabId} />
      <ParamsWrapper>
        {currentContent && currentContent.content.type === 'Process' && <ParamsProcess/>}
        {currentContent && currentContent.content.type === 'Operation' && <ParamsOperation/>}
        {currentContent && currentContent.content.type === 'CVOperation' && <ParamsCVOperation/>}
        {currentContent && currentContent.content.type === 'CVFrame' && <ParamsCVFrame/>}
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