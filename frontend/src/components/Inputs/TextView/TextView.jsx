import { useState } from 'react'

export default function TextView({ value = '', variable, title, name, required = true}) {
  const [inputContent, setContent] = useState(value)
  return (
    <label style={{ 
      width: '100%', 
      marginBottom: '10px', 
      paddingBottom: '10px', 
      display: 'flex', 
      alignItems: 'baseline' 
    }} htmlFor={variable}>
      <span style={{ paddingRight: '10px' }}>{title}</span>
      <input 
        type="text" 
        value={inputContent}
        name={name} 
        style={{
          padding: '10px',
          border: `${required && value.trim().length ? '1px #c7c7c7 solid' : '1px solid red'}`,
          borderRadius: '5px',
          outline: 'none',
          width: '100%',
          marginTop: '10px'
        }} 
        title={title} 
        onChange={(e) => setContent(e.target.value)} 
      />
    </label>
  )
}