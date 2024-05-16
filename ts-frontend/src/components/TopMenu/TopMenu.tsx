/* eslint-disable jsx-a11y/anchor-is-valid */
import './TopMenu.css'
import { useSimpleUI } from '../../context/context'
import { IContextProviderData } from '../../models/ContextConfiguration'
import { askFile, getJsonData, saveFileContent } from '../../eelExpose'
import { modals } from '../../models/Modals'


export default function TopMenu() {
  const { configurationService, appData, setModal, setModalError, updateConfigurationService, updateSideMenu, setAppData } = useSimpleUI() as IContextProviderData

  async function saveConfiguration() {
    if (appData && appData.configurationFilePath){
      await saveFileContent(appData.configurationFilePath, configurationService.getConfigurationJson())
    }
  }

  async function fileOpenClick(){
    const filePath = await askFile('simple_ui')
    if (filePath){
      const result = await getJsonData(filePath)
      if (result.error){
        setModal(modals.error)
        setModalError({
          title: result.error, 
          description: result.description,
          buttons: [
            {text: 'OK', onClick: () => {setModal(modals.startScreen)}},
          ]
        })
      } else if (result.data) {
        updateConfigurationService(result.data.ClientConfiguration)
        updateSideMenu()
        setModal(null)
        setAppData({configurationFilePath: filePath})
      }
    }
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
