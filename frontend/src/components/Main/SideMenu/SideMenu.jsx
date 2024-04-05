/* eslint-disable jsx-a11y/anchor-is-valid */
import './SideMenu.css'

export default function SideMenu() {
  return (
    <div className="side-menu">
      <ul>
        <Element className='main-menu' name='Main menu'></Element>
        <Element className='styles' name='Styles'></Element>
        <Element className='start-screen' name='StartScreen'></Element>
        <Element className='folder' name='Processes (10)'>
        {/* <ul className="side-menu-nested">
            <li><a href="#" className="icon folder open">Документы</a>
              <ul className="side-menu-nested">
                <li><a href="#" className="icon folder open">Экраны</a>
                  <ul className="side-menu-nested">
                    <li><a href="#" className="icon folder">Документы</a></li>
                    <li><a href="#" className="icon folder">Список товаров</a></li>
                    <li><a href="#" className="icon folder">Товар выбор</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul> */}
        </Element>
        <Element className='shedulers' name='Shedulers'></Element>
        <Element className='common-handlers' name='Common handlers'></Element>
        <Element className='pythonfiles' name='Python files'></Element>
        <Element className='mediafiles' name='Media Files'></Element>
      </ul>
    </div>
  )
}

function Element({className, name}){
  return (
    <li><a href="#" className={`icon ${className}`}>{name}</a></li>
  )
}