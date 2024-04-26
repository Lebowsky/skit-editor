import { useState } from "react";

interface ModalProps {
  children: React.ReactNode
  allowClose?: boolean
}

export default function Modal({ children, allowClose }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true)
  function closeModal(){
    allowClose && setIsOpen(false)
  }

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
      }}
      onClick={closeModal}
    >
      <div
        style={{
          background: "white",
          margin: "auto",
          padding: "2%",
          border: "2px solid #000",
          borderRadius: "10px",
          boxShadow: "2px solid black",
        }}
      >
        {children}
      </div>
    </div>
  );
};