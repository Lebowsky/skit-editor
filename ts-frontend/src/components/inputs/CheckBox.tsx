import { useState } from "react";
import { ICheckBox } from "../../models/Inputs";

export default function CheckBox({ title = "", isChecked, name }: ICheckBox) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <label style={{ width: '100%', marginBottom: '10px', paddingBottom: '10px' }}>
      <input
        name={name}
        type="checkbox"
        title={title}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        style={{ marginRight: 5 }} /
      >
      <span>{title}</span>
    </label>
  )
}