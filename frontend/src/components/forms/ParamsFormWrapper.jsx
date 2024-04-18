export default function ParamsFormWrapper({ onSubmit, children }) {
  return (
    <form
      style={{
        margin: '0 1% 20px 1%',
        width: '100%',
        minWidth: '500px',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px #33333326',
      }}
      onSubmit={onSubmit}>
      {children}
    </form>
  )
}