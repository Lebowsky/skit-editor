import { useSimpleUI } from '../context/context'
import ModalView from '../views/ModalView'
import SideMenu from './SideMenu/SideMenu.jsx'
// import Content from './Content.jsx'
// import ParamsDetails from '../../views/ParamsDetails/ParamsDetails.jsx'


export default function Main() {
const { sideMenu }: any = useSimpleUI()
  // const { x, y, ...rest }: { x: number, y: number, [key: string]: number } = { x: 1, y: 2, z: 3, q: 4 };

  return (
    <div style={{
      marginTop: 50,
      height: 'calc(100vh - 50px)',
      maxHeight: 'calc(100vh - 50px)',
      display: 'flex'
    }}>
      <ModalView></ModalView>
      {/* {currentDetails && <ParamsDetails data={currentDetails}></ParamsDetails>} */}
      <SideMenu sideMenu={sideMenu} />
      {/* <Content tabs={tabs} currentTab={currentTab} currentContent={currentContent}/> */}
    </div>
  )
}