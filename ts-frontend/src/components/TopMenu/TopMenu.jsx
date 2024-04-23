import { useSimpleUI } from '../../context/context'
// import { saveConfigurationJson } from '../../utils'
// import { fetchPostConfiguration } from '../../api'

/* eslint-disable jsx-a11y/anchor-is-valid */
import './TopMenu.css'
import { useEffect, useState } from 'react'
export default function TopMenu() {
  const { configuration } = useSimpleUI()
  const [configurationJson, setConfigurationJson] = useState()

  useEffect(() => {
    async function sendConig() {
      // const result = await fetchPostConfiguration(configurationJson)
      // console.log(result)
    }
    if (configurationJson) sendConig()
  }, [configurationJson])
  function saveConfiguration() {
    // setConfigurationJson(saveConfigurationJson(configuration))
  }
  return (
    <div className="top-menu">
      <a href="#" className="logo">Simple UI</a>
      <nav>
        <ul>
          <MenuSection title='File'>
            <MenuItem title='New'></MenuItem>
            <MenuItem title='Open'></MenuItem>
            <MenuItem title='Save' onClick={saveConfiguration}></MenuItem>
            <MenuItem title='Settings'></MenuItem>
          </MenuSection>
          <MenuSection title='Tools'>
            <MenuItem title='SQL Query'></MenuItem>
            <MenuItem title='Preview'></MenuItem>
            <MenuItem title='Search'></MenuItem>
          </MenuSection>
          <MenuSection title='Configuration'>
            <MenuItem title='Common'></MenuItem>
            <MenuItem title='Properties'></MenuItem>
          </MenuSection>
        </ul>
      </nav>
    </div>
  )
}
function MenuSection({ title, children }) {
  return (
    <li><a href="#">{title}</a>
      <ul>
        {children}
      </ul>
    </li>
  )
}
function MenuItem({ title, onClick }) {
  return (
    <li>
      <a href="#" onClick={onClick}>{title}</a>
    </li>
  )
}
