import { ISelector } from "../../models/Inputs"

export default function Selector({ title, name, options, value }: ISelector) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 10
    }}>
      <label style={{
        cursor: 'pointer', 
        width: '30%', 
      }}>
        {title}
      </label>
      <select 
        defaultValue={value}
        name={name} 
        style={{ 
          padding: '10px', 
          width: '100%', 
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