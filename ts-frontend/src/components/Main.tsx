import { useSimpleUI } from '../context/context'
import { IContextProviderData } from '../models/ContextConfiguration'
import ModalView from '../views/ModalView'
import Content from './Content'
import SideMenu from './SideMenu/SideMenu'
// import ParamsDetails from '../../views/ParamsDetails/ParamsDetails.jsx'


export default function Main() {
const { sideMenu } = useSimpleUI() as IContextProviderData
  return (
    <div style={{
      marginTop: 50,
      height: 'calc(100vh - 50px)',
      maxHeight: 'calc(100vh - 50px)',
      display: 'flex'
    }}>
      <ModalView></ModalView>
      {/* {currentDetails && <ParamsDetails data={currentDetails}></ParamsDetails>} */}
      {sideMenu && <SideMenu sideMenu={sideMenu} />}
      <Content/>
      {/* <Content tabs={tabs} currentTab={currentTab} currentContent={currentContent}/> */}
    </div>
  )
}