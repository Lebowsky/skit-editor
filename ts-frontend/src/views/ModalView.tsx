import Modal from '../components/layouts/Modal'
import { useSimpleUI } from '../context/context'
import { IContextProviderData } from "../models/ContextConfiguration"

export default function ModalView() {
  const { loading, loadingError } = useSimpleUI() as IContextProviderData
  return (
    <>
      {loading && <Modal><p>Loading...</p></Modal>}
      {loadingError && <Modal><p>{`Loading error: ${loadingError}`}</p></Modal>}
    </>
  )
}
