

export default function Selector({ title, options, defaultValue }) {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }}>
      <label style={{
        cursor: 'pointer', 
        marginRight: '10px', 
        fontWeight: '600', 
        width: '27%', 
        marginBottom: '0px', 
        paddingBottom: '0px', 
        paddingRight: '10px'
      }}>
        {title}
      </label>
      <select 
        defaultValue={defaultValue} 
        style={{ 
          padding: '8px', 
          width: '100%', 
          marginTop: '10px', 
          borderWidth: '1px', 
          borderBlockColor: '#000', 
          borderRadius: '4px' 
        }}>
        {options && Object.entries(options).map(
          ([value, title], idx) => 
          <option 
            key={idx} 
            value={value} 
            style={{ 
              background: '#F9F9F9', 
              padding: '5px', 
              color: '#333' 
            }}>
              {title}
            </option>
        )}
      </select>
    </div>
  )
}