import SideMenu from './SideMenu/SideMenu.jsx'
import Content from './Content/Content.jsx'


export default function Main() {
  const style = {
    marginTop: 50,
    height: 'calc(100vh - 50px)',
    maxHeight: 'calc(100vh - 50px)',
    display: 'flex'
  }
  return (
    <div style={style}>
      <SideMenu />
      {/* <Content /> */}
    </div>
  )
}