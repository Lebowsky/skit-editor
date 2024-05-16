interface TabsProps {
  tabsData: {id: number, title: string, onClick(): void}[]
  currentTabId: number
}
export default function Tabs({ tabsData, currentTabId }: TabsProps) {
  return (
    <div
      style={{
        padding: '5px 0 0 5px',
        borderBottom: '1px #a9a9a9 solid',
        display: 'flex',
        background: '#fff',
        width: '100%',
        height: '40px',
        overflow: 'hidden',
        justifyContent: 'right',
      }}
    >
      {tabsData.map(
        item => 
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
  children: React.ReactNode
  isActive: boolean
  onClick?(): void
}

function Tab({ children, isActive, onClick }: TabProps){
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

  return (
    <div style={isActive ? activeTabStyle : tabStyle}>
      <span 
        onClick={onClick} 
        style={{ 
          userSelect: 'none', 
          fontSize: '15px' 
        }}>
          {children}
        </span>
    </div>
  )
}

