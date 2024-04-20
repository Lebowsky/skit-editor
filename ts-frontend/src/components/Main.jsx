import SideMenu from './SideMenu/SideMenu.jsx'
// import Content from './Content.jsx'
import { useSimpleUI } from '../context/context'
import Modal from './layouts/Modal.jsx'
// import ParamsDetails from '../../views/ParamsDetails/ParamsDetails.jsx'
// import Modal from '../layouts/Modal.jsx'


export default function Main() {
  // const { loading, loadingFail, currentState: {currentTab, currentContent, currentDetails}, sideMenu, tabs} = useSimpleUI()
  const { loading, loadingError, sideMenu } = useSimpleUI()
  
  return (
    <div style={{
      marginTop: 50,
      height: 'calc(100vh - 50px)',
      maxHeight: 'calc(100vh - 50px)',
      display: 'flex'
    }}>
      {loading && <Modal isOpen={true}><p>Loading...</p></Modal>}
      {loadingError && <Modal isOpen={true}><p>{`Loading error: ${loadingError}`}</p></Modal>}
     {/* {currentDetails && <ParamsDetails data={currentDetails}></ParamsDetails>} */}
      <SideMenu sideMenu={sideMenu}/>
      {/* <Content tabs={tabs} currentTab={currentTab} currentContent={currentContent}/> */}
    </div>
  )
}