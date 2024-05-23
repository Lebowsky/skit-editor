import Button from "../../components/inputs/Button";
import { useSimpleUI } from "../../context/context";
import { askFile, getJsonData } from "../../eelExpose";
import { IContextProviderData } from "../../models/ContextConfiguration";
import { modals } from "../../models/Modals";

export default function StartScreen() {
  const { setModal, setModalError, updateConfigurationService, updateSideMenu, setAppData } = useSimpleUI() as IContextProviderData

  async function fileOpenClick(){
    setModal(modals.openFileProject)
  }

  return (
    <div style={{ width: '500px' }}>
      <div 
        style={{ 
          padding: 10, 
          borderBottom: '10px solid #ccc', 
          marginBottom: 30
        }}>
        <h1
          style={{
            textAlign: 'center',
          }}>
          Welcome to Simple UI
        </h1>
      </div>

      <div style={{padding:15, display:'flex', justifyContent: 'space-around'}}>
        <Button>New project</Button>
        <Button onClick={fileOpenClick}>Open</Button>
      </div>
    </div>
  )
}