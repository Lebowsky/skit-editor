import { useState } from 'react'

export default function TextView({ value = '', variable, title, required = true }) {
  const [name, setName] = useState(value)
  const style = {
    padding: '10px',
    border: `${required && name.trim().length ? '1px #c7c7c7 solid' : '1px solid red'}`,
    borderRadius: '5px',
    outline: 'none',
    width: '100%',
    marginTop: '10px'
  }

  return (
    <label style={{ width: '100%', marginBottom: '10px', paddingBottom: '10px', display: 'flex', alignItems: 'baseline' }} htmlFor={variable}>
      <span style={{ paddingRight: '10px' }}>{title}</span>
      <input type="text" value={name} style={style} title={title} onChange={e => setName(e.target.value)} />
    </label>
  )
}