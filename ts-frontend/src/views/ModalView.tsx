import Modal from '../components/layouts/Modal.jsx'
import { useSimpleUI } from '../context/context'

export default function ModalView() {
  const { loading, loadingError }: any = useSimpleUI()
  return (
    <>
      {loading && <Modal><p>Loading...</p></Modal>}
      {loadingError && <Modal><p>{`Loading error: ${loadingError}`}</p></Modal>}
    </>
  )
}
