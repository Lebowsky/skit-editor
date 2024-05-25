import { ToastContainer, toast as t, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSimpleUI } from '../context/context'
import { IContextProviderData } from '../models/ContextConfiguration'
import ModalView from '../views/ModalView'
import Content from './Content'
import SideMenu from './SideMenu/SideMenu'


export default function Main() {
  const { modal, sideMenu, currentContent } = useSimpleUI() as IContextProviderData
  
  return (
    <div style={{
      marginTop: 50,
      height: 'calc(100vh - 50px)',
      maxHeight: 'calc(100vh - 50px)',
      display: 'flex'
    }}>
      {modal && <ModalView></ModalView>}
      {sideMenu && <SideMenu sideMenu={sideMenu} />}
      {currentContent && <Content key={currentContent.id} />}
      <ToastContainer 
        position={'bottom-center'}
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        theme={"light"}
        transition={Slide}
      />
    </div>
  )
}