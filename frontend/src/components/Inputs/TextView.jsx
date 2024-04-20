import { useState } from 'react'

export default function TextView({ value = '', variable, title, name, required = true }) {
  const [inputContent, setContent] = useState(value)
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    }}>
      <label style={{
        cursor: 'pointer',
        fontWeight: '600', 
        width: '100%',
        display: 'flex',
        alignItems: 'baseline'
      }} 
        htmlFor={variable}
      >
        <span 
          style={{ 
            width: '30%'
          }}>
            {title}
        </span>
        <input
          type="text"
          value={inputContent}
          name={name}
          style={{
            padding: '10px',
            border: `${(required && !inputContent.trim().length) ? '1px solid red' : '1px #c7c7c7 solid'}`,
            borderRadius: '5px',
            outline: 'none',
            width: '100%',
            marginTop: '10px'
          }}
          title={title}
          onChange={(e) => {
            setContent(e.target.value)
          }}
        />
      </label>
    </div>
  )
}