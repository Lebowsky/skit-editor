import { useSimpleUI } from '../../context/context'
import { saveConfigurationJson } from '../../utils'
import { fetchPostConfiguration } from '../../api'  

/* eslint-disable jsx-a11y/anchor-is-valid */
import './TopMenu.css'
import { useEffect, useState } from 'react'
export default function TopMenu() {
  const { configuration } = useSimpleUI()
  const [configurationJson, setConfigurationJson] = useState()

  useEffect(() => {
    // console.log(configurationJson)
    async function sendConig(){
      const result = await fetchPostConfiguration(configurationJson)
      console.log(result)
    }
    if (configurationJson) sendConig()
  }, [configurationJson])

  function saveConfiguration(){
    setConfigurationJson(saveConfigurationJson(configuration))
  }
  return (
    <div className="top-menu">
      <a href="#" className="logo">Simple UI</a>
      <nav>
      <ul>
        <li><a href="#">File</a>
          <ul>
            <li><a href="#">New</a></li>
            <li><a href="#">Open</a></li>
            <li><a href="#" onClick={saveConfiguration}>Save</a></li>
          </ul>
        </li>
        <li><a href="#">Tools</a>
          <ul>
            <li><a href="#">SQL Query</a></li>
            <li><a href="#">Preview</a></li>
            <li><a href="#">Serarch</a></li>
            <li><a href="#">QR-Settings</a></li>
          </ul>
        </li>
        <li><a href="#">Configuration</a>
          <ul>
            <li><a href="#">Common</a></li>
            <li><a href="#">Properties</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    </div>
  )
}
