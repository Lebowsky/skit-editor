import Modal from '../components/layouts/Modal'
import { useSimpleUI } from '../context/context'
import { IContextProviderData } from "../models/ContextConfiguration"
import { modals } from '../models/Modals'
import { uuid } from '../utils'
import DetailsParams from './DetailsParams/DetailsParams'
import StartScreen from './dialogs/StartScreen'

export default function ModalView() {
  const { modal, loading, loadingError, currentDetails, updateDetails } = useSimpleUI() as IContextProviderData
  function canCloseDetails(): boolean {
    if (window.confirm("Dont save?")) {
      updateDetails(null)
      return true
    }
    return false
  }
  return (
    <>
      {modal === modals.startScreen && <Modal><StartScreen></StartScreen></Modal>}
      {/* {currentDetails && 
        <Modal 
          allowClose={canCloseDetails} 
          key={uuid()}
        >
          <DetailsParams/>
        </Modal>}
      {loading && <Modal><p>Loading...</p></Modal>}
      {loadingError && <Modal><p>{`Loading error: ${loadingError}`}</p></Modal>} */}
    </>
  )
}
