import { useSimpleUI } from '../context/context'
import { IContextProviderData, contextTypes } from '../models/ContextConfiguration'
import { ITabData, ITabType } from '../models/SideMenu'

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
          {...item}>
        {item.title}
      </Tab>)}
    </div>
  )
}

interface TabProps{
  id: number
  children: React.ReactNode
  isActive: boolean
  type: string
  contextType: contextTypes
}

function Tab({ id, children, isActive, type, contextType }: TabProps){
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
    setCurrentTab(id, contextType)
  }

  function handleClose(): void {
    removeTab(id)
  }

  return (
    <div style={isActive ? activeTabStyle : tabStyle}>
      <IconType iconType={type} />
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
  iconType: string
}
function IconType({ iconType }: IconTypeProrps) {
  const iconClass: string | undefined = {
    'Process': 'fa fa-cube',
    'Operation': 'fa fa-television',
    'CVOperation': '',
    'CVFrame': '',
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
