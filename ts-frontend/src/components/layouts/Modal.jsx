export default function Modal ({ children }){
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