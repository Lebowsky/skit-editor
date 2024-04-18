import { ParamInput, ParamsBlockTitle } from "../../components/forms/MainParamsForm";

export default function ParamsLinearLayout({ data }) {
  const fields = [
    { name: 'Variable', type: 'text', title: 'Variable'},
    { name: 'orientation', type: 'select', title: 'Orientation', options: {}},
    { name: 'height', type: 'select', title: 'Height', options: {}},
    { name: 'width', type: 'select', title: 'Width', options: {}},
    { name: 'weight', type: 'text', title: 'Weight'},
    { name: 'BackgroundColor', type: 'text', title: 'Background color'},
    { name: 'StrokeWidth', type: 'text', title: 'Stroke width'},
    { name: 'Padding', type: 'text', title: 'Padding'},
  ]

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    

    // const newContent = Object.fromEntries(fields.map(el => {
    //   return [el.name, getParamValue(form[el.name])]
    // }))
    // updateCurrentContent({ ...data, ...newContent })
  }
  return (
    <ModalParamsForm data={data} fields={fields} onSubmit={handleSubmit} title={data.type}></ModalParamsForm>
  )
}

export function ModalParamsForm({ data, fields, onSubmit, title }) {
  return (
    <ParamsFormWrapper onSubmit={onSubmit}>
      <ParamsBlockTitle>{title}</ParamsBlockTitle>
      {fields.map((el, idx) => (<ParamInput {...el} value={data[el.name]} key={idx} />))}
    </ParamsFormWrapper>
  )
}

export function ParamsFormWrapper({ onSubmit, children }) {
  return (
    <form
      style={{
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderRadius: '5px',
      }}
      onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export function getParamValue(param) {
  switch (param.type) {
    case 'text':
      return param.value
    case 'checkbox':
      return param.checked
    default:
      return null
  }
}