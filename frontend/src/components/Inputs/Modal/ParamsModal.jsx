
export function Params({ data, children }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'start',
      width: '100%',
      maxWidth: '550px',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  )
}
