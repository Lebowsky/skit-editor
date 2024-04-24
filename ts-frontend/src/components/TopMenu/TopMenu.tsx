/* eslint-disable jsx-a11y/anchor-is-valid */
import './TopMenu.css'
import { useSimpleUI } from '../../context/context'
import { IContextProviderData } from '../../models/ContextConfiguration'
import { fetchPostConfiguration } from '../../api'


export default function TopMenu() {
  const { configurationService } = useSimpleUI() as IContextProviderData

  async function saveConfiguration() {
    const result = await fetchPostConfiguration(configurationService.getConfigurationJson())
    console.log(result)
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
