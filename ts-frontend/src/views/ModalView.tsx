import Modal from '../components/layouts/Modal'
import { useSimpleUI } from '../context/context'
import { IContextProviderData } from "../models/ContextConfiguration"
import { uuid } from '../utils'
import DetailsParams from './DetailsParams/DetailsParams'

export default function ModalView() {
  const { loading, loadingError, currentDetails } = useSimpleUI() as IContextProviderData
  return (
    <>
      {currentDetails && <Modal allowClose={true} key={uuid()}><DetailsParams/></Modal>}
      {loading && <Modal><p>Loading...</p></Modal>}
      {loadingError && <Modal><p>{`Loading error: ${loadingError}`}</p></Modal>}
    </>
  )
}
