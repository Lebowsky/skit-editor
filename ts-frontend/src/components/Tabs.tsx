import { useSimpleUI } from '../context/context'
import { IContextProviderData } from '../models/ContextConfiguration'
import { ITabData } from '../models/SideMenu'

interface TabsProps {
  tabsData: ITabData[]
  currentTabId: number
}
export default function Tabs({ tabsData, currentTabId }: TabsProps) {
  return (
    <div
      style={{
        padding: '5px 0 0 5px',
        borderBottom: '1px #a9a9a9 solid',
        display: 'flex',
        position: 'fixed',
        background: '#fff',
        width: '100%',
        height: '40px',
        overflow: 'hidden'
      }}
    >
      {tabsData.map(
        item => (item.type === 'Operation' || item.type === 'Process')&&
        <Tab 
          isActive={currentTabId === item.id} 
          key={item.id} 
          tabId={item.id} 
          tabType={item.type}>
        {item.title}
      </Tab>)}
    </div>
  )
}

interface TabProps{
  tabId: number
  children: React.ReactNode
  isActive: boolean
  tabType: 'Process' | 'Operation'
}

function Tab({ tabId, children, isActive, tabType }: TabProps){
  const { setCurrentTab, removeTab } = useSimpleUI() as IContextProviderData

  const tabStyle = {
    padding: 10,
    borderRadius: '5px 5px 0 0',
    border: '1px #a9a9a9 solid',
    marginBottom: '-1px',
    marginRight: '2px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }
  const activeTabStyle = {
    ...tabStyle,
    background: '#a9a9a9',
    color: '#fff'
  }

  function handleClick(): void {
    setCurrentTab(tabId, tabType)
  }

  function handleClose(): void {
    removeTab(tabId)
  }

  return (
    <div style={isActive ? activeTabStyle : tabStyle}>
      <IconType iconType={tabType} />
      <span 
        onClick={handleClick} 
        style={{ 
          userSelect: 'none', 
          fontSize: '15px' 
        }}>
          {children}
        </span>
      <IconClose onClick={handleClose} />
    </div>
  )
}

interface IconTypeProrps {
  iconType: 'Process' | 'Operation'
}
function IconType({ iconType }: IconTypeProrps) {
  const iconClass: string = {
    'Process': 'fa fa-cube',
    'Operation': 'fa fa-television'
  }[iconType]
  return (
    <i 
      className={iconClass} 
      aria-hidden="true" 
      style={{ marginRight: 5, }}
    />
  )
}

interface IconCloseProps {
  onClick(): void
}
function IconClose({ onClick }: IconCloseProps) {
  return (
    <i 
      className="tab-icon fa fa-times" 
      aria-hidden="true" 
      onClick={onClick} 
      style={{ marginLeft: 3, }}
    />
  )
}
