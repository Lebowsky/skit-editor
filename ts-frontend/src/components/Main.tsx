import { useSimpleUI } from '../context/context'
import ModalView from '../views/ModalView'
import SideMenu from './SideMenu/SideMenu.jsx'
// import Content from './Content.jsx'
// import ParamsDetails from '../../views/ParamsDetails/ParamsDetails.jsx'


export default function Main() {
const { sideMenu }: any = useSimpleUI()
  return (
    <div style={{
      marginTop: 50,
      height: 'calc(100vh - 50px)',
      maxHeight: 'calc(100vh - 50px)',
      display: 'flex'
    }}>
      <ModalView></ModalView>
      {/* {currentDetails && <ParamsDetails data={currentDetails}></ParamsDetails>} */}
      {/* <SideMenu sideMenu={sideMenu} /> */}
      {/* <Content tabs={tabs} currentTab={currentTab} currentContent={currentContent}/> */}
    </div>
  )
}