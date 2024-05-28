import ModalParamsForm from "../../../components/forms/ModalParamsForm";
import { useSimpleUI } from "../../../context/context";
import { IContextProviderData } from "../../../models/ContextConfiguration";

export default function ParamsLayoutElement(){
  const { currentDetails, updateDetails } = useSimpleUI() as IContextProviderData
  interface ParamsFields {
    name: string
    type: string
    title: string
    options?: {[key: string]: string | boolean}
  }

  const fields: ParamsFields[] = [
    { name: 'Variable', type: 'text', title: 'Variable' },
    {name: 'orientation', type: 'select', title: 'Orientation', options: {
        horizontal: 'horizontal',
        vertical: 'vertical',
    }},
    {name: 'height', type: 'select', title: 'Height', options: {
        match_parent: 'match_parent',
        wrap_content: 'wrap_content',
    }},
    {name: 'width', type: 'select', title: 'Width', options: {
        match_parent: 'match_parent',
        wrap_content: 'wrap_content',
    }},
    {name: 'gravity_horizontal', type: 'select', title: 'Horizontal gravity', options: {
      center: 'center',
      left: 'left',
      right: 'right',
    }},
    {name: 'gravity_vertical', type: 'select', title: 'Vertical gravity', options: {
      center: 'center',
      top: 'top',
      bottom: 'bottom',
    }},
    { name: 'weight', type: 'text', title: 'Weight' },
    { name: 'BackgroundColor', type: 'text', title: 'Background color' },
    { name: 'StrokeWidth', type: 'text', title: 'Stroke width' },
    { name: 'Padding', type: 'text', title: 'Padding' },
    { name: 'TextSize', type: 'text', title: 'Text size' },
    { name: 'TextColor', type: 'text', title: 'Text color' },
    { name: 'TextBold', type: 'checkbox', title: 'Text bold' },
    { name: 'TextItalic', type: 'checkbox', title: 'Text italic' },
  ]

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      Variable: {value: string}
      orientation: {value: string}
      height: {value: string}
      width: {value: string}
      weight: {value: string}
      gravity_horizontal: {value: string}
      gravity_vertical: {value: string}
      BackgroundColor: {value: string}
      StrokeWidth: {value: string}
      Padding: {value: string}
      TextSize: {value: string}
      TextColor: {value: string}
      TextBold: {value: boolean}
      TextItalic: {value: boolean}
    }

    const newContent = {
      Variable: target.Variable.value,
      orientation: target.orientation.value,
      height: target.height.value,
      width: target.width.value,
      weight: target.weight.value,
      gravity_horizontal: target.gravity_horizontal.value,
      gravity_vertical: target.gravity_vertical.value,
      BackgroundColor: target.BackgroundColor.value,
      StrokeWidth: target.StrokeWidth.value,
      Padding: target.Padding.value,
      TextSize: target.Padding.value,
      TextColor: target.Padding.value,
      TextBold: target.Padding.value,
      TextItalic: target.Padding.value,
    }
    currentDetails && updateDetails({...currentDetails, content: {...currentDetails.content, ...newContent}})
    updateDetails(null)
  }
  return (
    currentDetails &&
    <ModalParamsForm
      fields={fields}
      onSubmit={handleSubmit}
      title={currentDetails.content.type.toString()}
    />
  )
}