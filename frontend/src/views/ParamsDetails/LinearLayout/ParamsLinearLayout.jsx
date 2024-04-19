import {getValue} from "../../../components/Inputs/ParamInput";
import ModalParamsForm from "../../../components/forms/ModalParamsForm";
import { useSimpleUI } from "../../../context/context";

export default function ParamsLinearLayout({ data }) {
  const {updateConfigItem, setCurrentDetails} = useSimpleUI()
  const fields = [
    { name: 'Variable', type: 'text', title: 'Variable'},
    { name: 'orientation', type: 'select', title: 'Orientation', options: {
      horizontal: 'horizontal',
      vertical: 'vertical',
    }},
    { name: 'height', type: 'select', title: 'Height', options: {
      match_parent: 'match_parent',
      wrap_content: 'wrap_content',
    }},
    { name: 'width', type: 'select', title: 'Width', options: {
      match_parent: 'match_parent',
      wrap_content: 'wrap_content',
    }},
    { name: 'weight', type: 'text', title: 'Weight'},
    { name: 'BackgroundColor', type: 'text', title: 'Background color'},
    { name: 'StrokeWidth', type: 'text', title: 'Stroke width'},
    { name: 'Padding', type: 'text', title: 'Padding'},
  ]

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newContent = Object.fromEntries(fields.map(el => {
      return [el.name, getValue(form[el.name])]
    }))
    setCurrentDetails(null)
    updateConfigItem(data.id, data.type, {...newContent, type: data.content.type})
  }
  return (
    <ModalParamsForm data={data} fields={fields} onSubmit={handleSubmit} title={data.content.type}></ModalParamsForm>
  )
}