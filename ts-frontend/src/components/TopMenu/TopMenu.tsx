/* eslint-disable jsx-a11y/anchor-is-valid */
import './TopMenu.css'
import { useSimpleUI } from '../../context/context'
import { IContextProviderData } from '../../models/ContextConfiguration'
import { modals } from '../../models/Modals'
import { saveFileContent } from '../../eelExpose'


export default function TopMenu() {
  const { configurationService, appData, setModal } = useSimpleUI() as IContextProviderData

  async function saveConfiguration() {
    if (appData && appData.configurationFilePath){
      await saveFileContent(appData.configurationFilePath, configurationService.getConfigurationJson())
    }
  }

  async function fileOpenClick(){
    setModal(modals.openFileProject)
  }

  return (
    <div className="top-menu">
      <a href="#" className="logo">Simple UI</a>
      <nav>
        <ul>
          <MenuSection title='File'>
            <MenuItem title='New'></MenuItem>
            <MenuItem title='Open' onClick={fileOpenClick}></MenuItem>
            <MenuItem title='Save' onClick={saveConfiguration}></MenuItem>
            <MenuItem title='Save as...'></MenuItem>
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

interface MenuSectionProps{
  title: string
  children: React.ReactNode
}

function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <li><a href="#">{title}</a>
      <ul>
        {children}
      </ul>
    </li>
  )
}

interface MenuItemProps {
  title: string
  onClick?(): void
}

function MenuItem({ title, onClick }: MenuItemProps) {
  return (
    <li>
      <a href="#" onClick={onClick}>{title}</a>
    </li>
  )
}
