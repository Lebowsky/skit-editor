export default function ParamsBlockWrapper({ children }) {
  return (
    <div
      style={{
        margin: '0 1% 20px 1%',
        width: '100%',
        minWidth: '500px',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px #33333326',
      }}
    >
      {children}
    </div>
  )
}