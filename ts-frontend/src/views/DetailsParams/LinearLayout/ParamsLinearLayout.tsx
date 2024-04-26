import ModalParamsForm from "../../../components/forms/ModalParamsForm";
import { useSimpleUI } from "../../../context/context";
import { IContextProviderData } from "../../../models/ContextConfiguration";

export default function ParamsLinearLayout() {
  const { currentDetails } = useSimpleUI() as IContextProviderData
  // const {updateConfigItem, setCurrentDetails} = useSimpleUI()
  interface ParamsFields {
    name: string
    type: string
    title: string
    options?: {[key: string]: string | boolean}
  }

  const fields: ParamsFields[] = [
    { name: 'Variable', type: 'text', title: 'Variable' },
    {
      name: 'orientation', type: 'select', title: 'Orientation', options: {
        horizontal: 'horizontal',
        vertical: 'vertical',
      }
    },
    {
      name: 'height', type: 'select', title: 'Height', options: {
        match_parent: 'match_parent',
        wrap_content: 'wrap_content',
      }
    },
    {
      name: 'width', type: 'select', title: 'Width', options: {
        match_parent: 'match_parent',
        wrap_content: 'wrap_content',
      }
    },
    { name: 'weight', type: 'text', title: 'Weight' },
    { name: 'BackgroundColor', type: 'text', title: 'Background color' },
    { name: 'StrokeWidth', type: 'text', title: 'Stroke width' },
    { name: 'Padding', type: 'text', title: 'Padding' },
  ]

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  //   const form = e.target;

  //   const newContent = Object.fromEntries(fields.map(el => {
  //     return [el.name, getValue(form[el.name])]
  //   }))
  //   setCurrentDetails(null)
  //   updateConfigItem(data.id, data.type, {...newContent, type: data.content.type})
  }
  return (
    currentDetails &&
    <ModalParamsForm
      fields={fields}
      onSubmit={handleSubmit}
      title={currentDetails.content.type}
    />
  )
}