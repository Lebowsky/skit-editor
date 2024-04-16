/* eslint-disable jsx-a11y/anchor-is-valid */
import ParamsProcess from '../../../views/MainParams/MainParamsProcess/MainParamsProcess.jsx'
import './Content.css'
import Tabs from './Tabs/Tabs.jsx'

export default function Content({ tabs, currentTab, currentContent }) {
  return (
    <div style={{ width: '85%', overflow: 'auto' }}>
      <Tabs tabsData={tabs} currentTab={currentTab} />
      <ContentWrapper>
        <Params data={currentContent}></Params>
      </ContentWrapper>
    </div>
  )
}

function ContentWrapper({ children }) {
  const style = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'start',
    marginTop: '60px'
  }
  return (
    <div style={style}>{children}</div>
  )
}

function Params({ data }) {
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    width: '100%',
    maxWidth: '700px',
    flexDirection: 'column',

  }
  return (
    <div style={style}>
      {data && data.content.type === 'Process' && <ParamsProcess data={data.content}></ParamsProcess>}
      {/* {data && data.content.type === 'Operation' && <OperationContent {...data}></OperationContent>} */}
    </div>
  )
}