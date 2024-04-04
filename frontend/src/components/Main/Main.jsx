import './Main.css'
import SideMenu from './SideMenu/SideMenu.jsx'
import Content from './Content/Content.jsx'


export default function Main(){
    return(
      <div className='main'>
        <SideMenu />
        <Content />
      </div>
    )
  }