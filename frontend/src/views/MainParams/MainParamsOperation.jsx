import MainParamsForm, { getParamValue } from "../../components/forms/MainParamsForm"
import { useSimpleUI } from "../../context/context"


export default function MainParamsOperation({ data }) {
  const { updateCurrentContent } = useSimpleUI()
  const fields = [
    {name: 'Name', type: 'text', title: 'Name'},
    {name: 'hideToolBarScreen', type: 'checkbox', title: 'Hide top bar'},
    {name: 'hideBottomBarScreen', type: 'checkbox', title: 'Hide button bar'},
    {name: 'noScroll', type: 'checkbox', title: 'Disable scrolling for Root Layout'},
    {name: 'noConfirmation', type: 'checkbox', title: 'Close without confirmation'},
  ]

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newContent = Object.fromEntries(fields.map(el => {
      return [el.name, getParamValue(form[el.name])]
    }))
    updateCurrentContent({ ...data, ...newContent })
  }
  return (
    <MainParamsForm data={data} fields={fields} onSubmit={handleSubmit} title={`Screen: ${data.Name}`}></MainParamsForm>
  )
}

