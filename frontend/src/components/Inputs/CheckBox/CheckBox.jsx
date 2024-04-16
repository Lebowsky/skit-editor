import { useState } from "react";

export default function CheckBox({ title = "", isChecked }) {
  const [checked, setChecked] = useState(isChecked); 

  return (
    <label style={{ width: '100%', marginBottom: '10px', paddingBottom: '10px' }}>
      <input type="checkbox" title={title} checked={checked} onChange={(e) => setChecked(e.target.checked)} style={{marginRight: 5}}/>
      <span>{title}</span>
    </label>
  )
}