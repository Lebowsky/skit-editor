import Button, { ButtonGroup } from "../../components/inputs/Button"
import Modal from "../../components/layouts/Modal"
import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"


export default function ErrorDialog() {
  const { modalError } = useSimpleUI() as IContextProviderData
  if (!modalError) return null

  return (
    <Modal>
      <h2 
        style={{ 
          textAlign: 'center',
          marginBottom: 40
        }}
      >
        {modalError.title}
      </h2>
      <p
        style={{
          textAlign: 'center',
          marginBottom: '5%'
        }}
      >
        {modalError.description}
      </p>
      <div style={{textAlign:'center'}}>
        {modalError.buttons && modalError.buttons.map(({ text, onClick }, idx) => (
          <Button onClick={onClick} key={idx}>{text}</Button>
        ))}
      </div>
    </Modal>
  )
}