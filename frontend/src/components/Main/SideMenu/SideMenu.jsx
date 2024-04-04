import './SideMenu.css'

export default function SideMenu(){
    return(
      <div className="side-menu">
        <ul>
        <li><a href="#" className="icon main-menu">Main menu</a></li>
        <li><a href="#" className="icon styles">Styles</a></li>
        <li><a href="#" className="icon start-screen">StartScreen</a></li>
        <li><a href="#" className="icon folder open">Processes</a>
          <ul className="side-menu-nested">
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
          </ul>
        </li>
        <li><a href="#">Shedulers</a></li>
        <li><a href="#">Common handlers</a></li>
        <li><a href="#">Python files</a></li>
        <li><a href="#">MediaFiles</a></li>
      </ul>
      </div>
    )
  }