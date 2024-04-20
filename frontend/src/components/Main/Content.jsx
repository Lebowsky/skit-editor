/* eslint-disable jsx-a11y/anchor-is-valid */
import ParamsOperation from '../../views/ParamsOperation.jsx'
import ParamsProcess from '../../views/ParamsProcess.jsx'
import Tabs from './Tabs.jsx'

export default function Content({ tabs, currentTab, currentContent }) {
  
  return (
    <div style={{ width: '85%', overflow: 'auto' }}>
      <Tabs tabsData={tabs} currentTab={currentTab} />

      <ParamsWrapper>
        {currentContent && currentContent.content.type === 'Process' && <ParamsProcess content={currentContent.content}></ParamsProcess>}
        {currentContent && currentContent.content.type === 'Operation' && <ParamsOperation {...currentContent}></ParamsOperation>}
      </ParamsWrapper>
    </div>
  )
}

export function ParamsWrapper({ children }) {
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
