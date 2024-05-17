import HandlersParamsForm from "../../../components/forms/HandlersParamsForm";
import { useSimpleUI } from "../../../context/context";
import { IContextProviderData } from "../../../models/ContextConfiguration";
import { IDetailsContent } from "../../../models/Content";
import useParamsHandlers from "../../../hooks/paramsHandlers";

export interface IFormData {
  event: string
  action: string
  type: string
  method: string
  listener: string
  postExecute: string
}
export interface ParamsFields {
  name: string
  type: string
  title: string
  options?: { [key: string]: string | boolean }
  onChange?(e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>): void
  hidden?: boolean
}

interface ParamsHandlersProps {
  initData: IDetailsContent
}
export default function ParamsHandlers({ initData }: ParamsHandlersProps) {
  const { currentDetails, updateDetails } = useSimpleUI() as IContextProviderData
  const { formData, setFormData } = useParamsHandlers()

  let fields: { [key: string]: ParamsFields } = {
    event: {
      name: 'event', type: 'select', title: 'Event', onChange: onChangeSelect, options: {
        OnStart: 'OnStart',
        OnInput: 'OnInput',
      }
    },
    action: {
      name: 'action', type: 'select', title: 'Action', onChange: onChangeSelect, options: {
        run: 'run',
        runasync: 'run async',
        runprogress: 'run progress',
      }
    },
    type: {
      name: 'type', type: 'select', title: 'Type', onChange: onChangeSelect, options: {
        python: 'python',
        pythonscript: 'pythonscript',
        pythonargs: 'pythonargs',
        online: 'online',
        http: 'http',
        sql: 'sql',
        httpworker: 'httpworker',
        worker: 'worker',
        set: 'set',
      }
    },
    method: { name: 'method', type: 'text', title: 'Method', onChange: onChangeInput, hidden: formData.type === 'pythonscript' },
    listener: { name: 'listener', type: 'text', title: 'Listener', onChange: onChangeInput },
    // postExecute: { name: 'postExecute', type: 'text', title: 'Post execute', onChange: onChangeInput },
  }

  function onChangeInput(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as typeof e.target & {
      name: string,
      value: string
    }
    setFormData(prev => ({ ...prev, [target.name]: target.value }))
  }

  function onChangeSelect(e: React.FormEvent<HTMLSelectElement>) {
    const target = e.target as typeof e.target & {
      name: string,
      value: string
    }
    setFormData(prev => {
      return { ...prev, [target.name]: target.value }
    })
  }

  function updateFormData(key: string, value: string){
    setFormData(prev => ({...prev, ...{[key]: value}}))
  }
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(formData.postExecute)
    currentDetails && updateDetails({ ...currentDetails, content: { ...currentDetails.content, ...formData } })
    updateDetails(null)
  }
  return (
    <HandlersParamsForm
      fields={fields}
      onSubmit={handleSubmit}
      title={'Handler'}
      formData={formData}
      setFormData={updateFormData}
    />
  )
}