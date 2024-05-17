import { useState } from "react";
import { IFormData } from "../views/operationViews/OperationElements/ParamsHandlers";
import { useSimpleUI } from "../context/context";
import { IContextProviderData } from "../models/ContextConfiguration";

export default function useParamsHandlers() {
  const { currentDetails } = useSimpleUI() as IContextProviderData
  const {...initialData} = {type: '', event: '', action: '', listener: '', method: '',  postExecute: '', source: '', ...currentDetails?.content}

  if (initialData.type === 'pythonscript'){
    initialData.source = initialData.method
  }

  const [formData, setFormData] = useState<IFormData>(initialData)
  return { formData, setFormData }
}