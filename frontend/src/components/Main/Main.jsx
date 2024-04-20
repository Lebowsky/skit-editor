import SideMenu from './SideMenu/SideMenu.jsx'
import Content from './Content.jsx'
import { useSimpleUI } from '../../context/context.jsx'
import ParamsDetails from '../../views/ParamsDetails/ParamsDetails.jsx'
import Modal from '../layouts/Modal.jsx'


export default function Main() {
  const { loading, loadingFail, currentState: {currentTab, currentContent, currentDetails}, sideMenu, tabs} = useSimpleUI()
  const style = {
    marginTop: 50,
    height: 'calc(100vh - 50px)',
    maxHeight: 'calc(100vh - 50px)',
    display: 'flex'
  }
  return (
    <div style={style}>
      {loading && <Modal isOpen={true}><p>Loading...</p></Modal>}
      {loadingFail && <Modal isOpen={true}><p>Loading error</p></Modal>}
     {currentDetails && <ParamsDetails data={currentDetails}></ParamsDetails>}
      <SideMenu sideMenu={sideMenu}/>
      <Content tabs={tabs} currentTab={currentTab} currentContent={currentContent}/>
    </div>
  )
}