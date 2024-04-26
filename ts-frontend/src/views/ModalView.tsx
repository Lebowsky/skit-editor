// import { v4 as uuidv4 } from 'uuid';
import Modal from '../components/layouts/Modal'
import { useSimpleUI } from '../context/context'
import { IContextProviderData } from "../models/ContextConfiguration"
import DetailsParams from './DetailsParams/DetailsParams'

export default function ModalView() {
  const { loading, loadingError, currentDetails } = useSimpleUI() as IContextProviderData
  return (
    <>
      {/* {currentDetails && <Modal allowClose={true} key={uuidv4()}><DetailsParams/></Modal>} */}
      {loading && <Modal><p>Loading...</p></Modal>}
      {loadingError && <Modal><p>{`Loading error: ${loadingError}`}</p></Modal>}
    </>
  )
}
