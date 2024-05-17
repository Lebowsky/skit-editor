import { useState } from "react";
import { IFormData } from "../views/operationViews/OperationElements/ParamsHandlers";
import { useSimpleUI } from "../context/context";
import { IContextProviderData } from "../models/ContextConfiguration";

export default function useParamsHandlers() {
  const { currentDetails } = useSimpleUI() as IContextProviderData

  const [formData, setFormData] = useState<IFormData>({
    type: '',
    event: '',
    action: '',
    method: '',
    listener: '',
    postExecute: '',
    ...currentDetails?.content
  })

  return { formData, setFormData }
}