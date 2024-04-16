/* eslint-disable jsx-a11y/anchor-is-valid */
import './Content.css'
import Tabs from './Tabs/Tabs.jsx'

export default function Content({ tabs, currentTab }) {
  return (
    <div style={{width: '85%', overflow: 'auto'}}>
       <Tabs tabsData={tabs} currentTab={currentTab}/>
    </div>
  )
}
