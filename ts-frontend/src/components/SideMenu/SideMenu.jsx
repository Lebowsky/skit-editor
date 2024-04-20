/* eslint-disable jsx-a11y/anchor-is-valid */
import './SideMenu.css'
import { useState } from 'react'
import { useSimpleUI } from '../../context/context'

const icons = {
  'MainMenu': 'icon main-menu',
  'StyleTemplates': 'icon styles',
  'StartScreen': 'icon start-screen',
  'Processes': 'icon processes',
  'Process': 'icon process',
  'CVOperation': 'icon cvo',
  'CVFrame': 'icon frame',
  'Operation': 'icon operation',
  'Mediafile': 'icon mediafiles',
  'PyFiles': 'icon pythonfiles',
  'CommonHandlers': 'icon common-handlers',
  'Shedulers': 'icon shedulers',
}

export default function SideMenu({ sideMenu }) {
  return (
    <div className="side-menu">
      <ul>
        {sideMenu.map((item, idx) => <MenuItem {...item} key={idx}> </MenuItem>)}
      </ul>
    </div>
  )
}

function MenuItem(item) {
  const { addTab } = useSimpleUI()
  const [isOpened, setIsOpened] = useState(false)

  function handleItem(item) {
    setIsOpened((prev) => !prev)
    item.id !== undefined && addTab({id: item.id, title: item.title, type: item.type})
  }

  const className = isOpened ? `${icons[item.type]} open` : `${icons[item.type]}`
  return (
    <>
      <li key={item.id}>
        <a href="#" className={className} onClick={(() => handleItem(item))}>
          {item.title}
        </a>
        {isOpened && item.nestedItems &&
          <ul className="side-menu-nested">
            {item.nestedItems.map((el) =>
              <MenuItem {...el} key={el.id}  > </MenuItem>)
            }
          </ul>}
      </li>
    </>
  )
}