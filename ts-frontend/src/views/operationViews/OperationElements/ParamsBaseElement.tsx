import ModalParamsForm from "../../../components/forms/ModalParamsForm";
import { useSimpleUI } from "../../../context/context";
import { IContextProviderData } from "../../../models/ContextConfiguration";

export default function ParamsBaseElement() {
  const { currentDetails, updateDetails } = useSimpleUI() as IContextProviderData
  interface ParamsFields {
    name: string
    type: string
    title: string
    options?: { [key: string]: string | boolean }
  }

  const fields: ParamsFields[] = [
    { name: 'Variable', type: 'text', title: 'Variable' },
    { name: 'Value', type: 'text', title: 'Variable' },
  ]

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      Variable: { value: string }
      Value: { value: string }
    }

    const newContent = {
      Variable: target.Variable.value,
      Value: target.Value.value,
    }
    currentDetails && updateDetails({ ...currentDetails, content: { ...currentDetails.content, ...newContent } })
    updateDetails(null)
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