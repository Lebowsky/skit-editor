import Modal from '../components/layouts/Modal'
import { useSimpleUI } from '../context/context'
import { IContextProviderData } from "../models/ContextConfiguration"
import { modals } from '../models/Modals'

import DetailsParams from './DetailsParams/DetailsParams'
import ErrorDialog from './dialogs/ErrorDialog'
import OpenFileDialog from './dialogs/OpenFileDialog'
import StartScreen from './dialogs/StartScreen'

export default function ModalView() {
  const { modal, modalError, loading, loadingError, currentDetails,  } = useSimpleUI() as IContextProviderData
  
  return (
    <>
      {modal === modals.startScreen && <StartScreen></StartScreen>}
      {modal === modals.openFileProject && <OpenFileDialog></OpenFileDialog>}
      {modal === modals.error && modalError && <ErrorDialog/>}
      {currentDetails && <DetailsParams/>}
      {loading && <Modal><p>Loading...</p></Modal>}
      {loadingError && <Modal><p>{`Loading error: ${loadingError}`}</p></Modal>}
    </>
  )
}
