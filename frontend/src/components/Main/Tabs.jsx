import { useSimpleUI } from '../../context/context'

export default function Tabs({ tabsData, currentTab }) {
  const style = {
    padding: '5px 0 0 5px',
    borderBottom: '1px #a9a9a9 solid',
    display: 'flex',
    position: 'fixed',
    background: '#fff',
    width: '100%',
    height: '40px',
    overflow: 'hidden'
  }
  return (
    <div style={style}>
      {tabsData.map(item => <Tab isActive={currentTab === item.id} key={item.id} tabId={item.id} type={item.type}>
        {item.title}
      </Tab>)}
    </div>
  )
}
function Tab({ tabId, children, isActive, type }) {
  const { removeTab, setCurrentTab } = useSimpleUI()
  const style = {
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
    ...style,
    background: '#a9a9a9',
    color: '#fff'
  }
  function handleClick() {
    setCurrentTab(tabId, type)
  }
  function handleClose() {
    removeTab(tabId)
  }
  return (
    <div style={isActive ? activeTabStyle : style}>
      <IconType type={type} />
      <span onClick={handleClick} style={{ 'userSelect': 'none', fontSize: '15px' }}>{children}</span>
      <IconClose onClick={handleClose} />
    </div>
  )
}
function IconType({ type }) {
  const iconClass = {
    'Process': 'fa fa-cube',
    'Operation': 'fa fa-television'
  }[type]
  return (
    <i className={iconClass} aria-hidden="true" style={{ marginRight: 5, }}></i>
  )
}
function IconClose({ onClick }) {
  return (
    <i className="tab-icon fa fa-times" aria-hidden="true" onClick={onClick} style={{ marginLeft: 3, }}></i>
  )
}