import SideMenu from './SideMenu/SideMenu.jsx'
import Content from './Content/Content.jsx'
import { useSimpleUI } from '../../context/context.jsx'


export default function Main() {
  const { currentState: {currentTab, currentContent, currentDetails}, sideMenu, tabs} = useSimpleUI()
  const style = {
    marginTop: 50,
    height: 'calc(100vh - 50px)',
    maxHeight: 'calc(100vh - 50px)',
    display: 'flex'
  }
  return (
    <div style={style}>
      <SideMenu sideMenu={sideMenu}/>
      <Content tabs={tabs} currentTab={currentTab}/>
    </div>
  )
}