import { useState } from "react";
import HandlersParamsForm from "../../../components/forms/HandlersParamsForm";
import { useSimpleUI } from "../../../context/context";
import { IContextProviderData } from "../../../models/ContextConfiguration";
import { IDetailsContent } from "../../../models/Content";

export interface IFormData {
  event: string
  action: string
  type: string
  method: string
  listener: string
  postExecue: string
}
interface ParamsFields {
  name: string
  type: string
  title: string
  options?: { [key: string]: string | boolean }
  onChange?(e: React.FormEvent<HTMLInputElement>): void
}

interface ParamsHandlersProps {
  initData: IDetailsContent
}
export default function ParamsHandlers( {initData} : ParamsHandlersProps ) {
  const { currentDetails, updateDetails } = useSimpleUI() as IContextProviderData
  const [formData, setFormData] = useState<IFormData>({
    event: '',
    action: '',
    method: '',
    listener: '',
    postExecue: '',
    ...initData.content
  })
  function onChangeInput(e: React.FormEvent<HTMLInputElement>){
    const target = e.target as typeof e.target & {
      name: string,
      value: string
    }
    setFormData(prev=> ({...prev, [target.name]: target.value}))
  }
  const fields: ParamsFields[] = [
    {
      name: 'event', type: 'select', title: 'Event', options: {
        OnStart: 'OnStart',
        OnInput: 'OnInput',
      }
    },
    {
      name: 'action', type: 'select', title: 'Action', options: {
        run: 'run',
        runasync: 'run async',
        runprogress: 'run progress',
      }
    },
    {
      name: 'type', type: 'select', title: 'Type', options: {
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
    { name: 'method', type: 'text', title: 'Method', onChange: onChangeInput },
    { name: 'listener', type: 'text', title: 'Listener', onChange: onChangeInput },
    { name: 'postExecute', type: 'text', title: 'Post execute' },
  ]
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      event: { value: string }
      action: { value: string }
      type: { value: string }
      method: { value: string }
      listener: { value: string }
      postExecute: { value: string }
    }

    const newContent = {
      event: target.event.value,
      action: target.action.value,
      type: target.type.value,
      method: target.method.value,
      listener: target.listener.value,
      postExecute: target.postExecute.value,
    }
    currentDetails && updateDetails({ ...currentDetails, content: { ...currentDetails.content, ...newContent } })
    updateDetails(null)
  }
  return (
    <HandlersParamsForm
      fields={fields}
      onSubmit={handleSubmit}
      title={'Handler'}
      formData={formData}
    />
  )
}