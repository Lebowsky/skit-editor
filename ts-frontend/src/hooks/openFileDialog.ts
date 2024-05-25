import { useState } from "react";
import { useSimpleUI } from "../context/context";
import { IContextProviderData } from "../models/ContextConfiguration";
import { modals } from "../models/Modals";
import { IFileOpenResponse, IErrorResponce, IProjectPathsData } from "../models/apiResponces";
import { getJsonData } from "../services/eelExpose";
import { toast } from "react-toastify";

interface OpenFileDialogFormData {
  uiPath: string
  workingDirPath: string
  projectConfigPath: string
}

export default function useOpenFileDialog() {
  const defaultTitle = '<Not selected>'
  const { setModal, setModalError, updateConfigurationService, updateSideMenu, setAppData } = useSimpleUI() as IContextProviderData
  const [formData, setFormData] = useState<OpenFileDialogFormData>({
    uiPath: defaultTitle,
    workingDirPath: defaultTitle,
    projectConfigPath: defaultTitle
  })

  function setError(error: IErrorResponce) {
    setModal(modals.error)
    setModalError({
      title: error.title,
      description: error.detail,
      buttons: [
        { text: 'OK', onClick: () => { setModal(modals.startScreen) } },
      ]
    })
  }

  function updateFormData(dataResponse: IFileOpenResponse){
    if (!dataResponse) return null
    const { data, error } = dataResponse

    if (error) {
      setError(error)
    } else if (data) {
      const newData = {
        uiPath: data.ui_path,
        workingDirPath: data.working_dir_path,
        projectConfigPath: data.project_config_path
      }
      setFormData(prev => ({
          ...prev, 
          ...{
            uiPath: newData.uiPath || prev.uiPath,
            workingDirPath: newData.workingDirPath || prev.workingDirPath,
            projectConfigPath: newData.projectConfigPath || prev.projectConfigPath,
          }
      }))
    } else {
      setError({ title: 'Unknown error', detail: 'Something went wrong', type: 'UnknownError' })
    }
  }
  
  async function loadUiConfig (){
    const {uiPath, workingDirPath, projectConfigPath} = formData

    if (uiPath && uiPath !== defaultTitle){
      const reqData: IProjectPathsData = {
        ui_path: uiPath,
        working_dir_path: (workingDirPath && workingDirPath !== defaultTitle) ? workingDirPath : '',
        project_config_path: (projectConfigPath && projectConfigPath !== defaultTitle) ? projectConfigPath : ''
      }

      const result = await getJsonData(reqData)
      updateConfigurationService(result.data.ClientConfiguration)
      updateSideMenu()
      setModal(null)
      setAppData({uiPath: uiPath, workingDirPath: workingDirPath, projectConfigPath: projectConfigPath})
    } else {
      toast.info('Pleast select UI file')
    }
  }
  

  return { formData, updateFormData, loadUiConfig }
}