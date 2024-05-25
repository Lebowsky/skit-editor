import { useState } from "react";
import { useSimpleUI } from "../../context/context";
import { IContextProviderData } from "../../models/ContextConfiguration";

interface ModalProps {
  children: React.ReactNode
  allowClose?(): boolean
}

export default function Modal({ children, allowClose }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true)
  const { setModal } = useSimpleUI() as IContextProviderData

  function closeModal() {
    allowClose && allowClose() && setIsOpen(false)
    setModal(null)
  }

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 50,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
      onClick={closeModal}
    >
      <div
        style={{
          background: "white",
          margin: "auto",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
        onClick={e => { e.stopPropagation() }}
      >
        {allowClose && <CloseModalIcon onClick={closeModal} />}
        {children}
      </div>
    </div>
  );
};

interface CloseModalIconProps {
  onClick?(): void
}
function CloseModalIcon({ onClick }: CloseModalIconProps) {
  return (
    <i
      className="tab-icon fa fa-times"
      aria-hidden="true"
      onClick={onClick} 
      style={{
        fontSize: 16,
        cursor: 'pointer',
        position: 'relative',
        top: -10,
        right: -10,
        background: 'white',
        padding: '4px 5px 5px 5px',
        borderRadius: '50%',
        width: 15,
        height: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'content-box',
        boxShadow: '0 0 7px #0000007a',
        float: 'right'
      }}
    />
  )
}