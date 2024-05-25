import { useSimpleUI } from "../context/context"
import { IContextProviderData, contextTypes } from "../models/ContextConfiguration"
import MainMenu from "../views/contentViews/MainMenu"
import StyleTemplates from "../views/contentViews/StyleTemplates"
import ParamsCVFrame from "../views/cvFrameViews/ParamsCVFrame"
import ParamsCVOperation from "../views/cvOperationViews/ParamsCVOperation"
import StartScreen from "../views/contentViews/StartScreen"
import ParamsOperation from "../views/operationViews/ParamsOperation"
import ParamsProcess from "../views/processViews/ParamsProcess"
import MainTabs from "./tabs/MainTabs"
import Shedulers from "../views/contentViews/Shedulers"
import CommonHandlers from "../views/contentViews/CommonHandlers"
import PythonFiles from "../views/contentViews/PythonFiles"
import MediaFiles from "../views/contentViews/MediaFiles"


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
        <MainMenu/>
        <StyleTemplates/>
        <StartScreen/>
        <Shedulers/>
        <CommonHandlers/>
        <PythonFiles/>
        <MediaFiles/>
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