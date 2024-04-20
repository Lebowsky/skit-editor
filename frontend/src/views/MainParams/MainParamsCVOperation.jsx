import MainParamsForm, {getParamValue} from "../../components/forms/MainParamsForm"
import { useSimpleUI } from "../../context/context"


export default function MainParamsCVOperation({ data }) {
  const { updateCurrentContent } = useSimpleUI()
  const fields = [
    {name: 'CVOperationName', type: 'text', title: 'Name'},
    {name: 'hidden', type: 'checkbox', title: 'Do not display in Menu'},
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
    <MainParamsForm data={data} fields={fields} onSubmit={handleSubmit} title={`Process: ${data.CVOperationName}`}></MainParamsForm>
  )
}