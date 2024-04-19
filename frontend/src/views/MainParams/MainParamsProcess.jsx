import MainParamsForm, {getParamValue} from "../../components/forms/MainParamsForm"
import { useSimpleUI } from "../../context/context"


export default function MainParamsProcess({ data }) {
  const { updateCurrentContent } = useSimpleUI()
  const fields = [
    {name: 'ProcessName', type: 'text', title: 'Name'},
    {name: 'DefineOnBackPressed', type: 'checkbox', title: 'Override back button (ON_BACK_PRESSED input event)'},
    {name: 'hidden', type: 'checkbox', title: 'Do not display in Menu'},
    {name: 'login_screen', type: 'checkbox', title: 'Run at startup'},
  ]

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newContent = Object.fromEntries(fields.map(el => {
      return [el.name, getParamValue(form[el.name])]
    }))
    updateCurrentContent({...data, ...newContent})
  }
  return (
    <MainParamsForm data={data} fields={fields} onSubmit={handleSubmit} title={`Process: ${data.ProcessName}`}></MainParamsForm>
  )
}

