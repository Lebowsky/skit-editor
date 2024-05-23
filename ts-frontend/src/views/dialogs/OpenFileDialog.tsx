import { error } from "console";
import Button from "../../components/inputs/Button";
import { useSimpleUI } from "../../context/context";
import { askFile, getProjectPathsData } from "../../eelExpose";
import { IContextProviderData } from "../../models/ContextConfiguration";
import { DataResponce, ErrorResponce, ProjectPathsData } from "../../models/apiResponces";
import { useState } from "react";

interface OpenFileDialogFormData {
  uiPath: string
  workingDirPath: string
  projectConfigPath: string
}

export default function OpenFileDialog() {
  const { setModal } = useSimpleUI() as IContextProviderData
  const defaultTitle = '<Not selected>'
  const [formData, setFormData] = useState<OpenFileDialogFormData>({
    uiPath: defaultTitle,
    workingDirPath: defaultTitle,
    projectConfigPath: defaultTitle
  })

  async function uiFileOpenClick() {
    const result = await getProjectPathsData()
    console.log(result)
    if (!result) return null
    const { data, error } = result

    if (error) {
      console.log(error)
    } else if (data) {
      setFormData(prev => ({
        ...prev, ...{
          uiPath: data.ui_path || defaultTitle,
          workingDirPath: data.working_dir_path || defaultTitle,
          projectConfigPath: data.project_config_path || defaultTitle
        }
      }))
    } else {
      console.log(result)
    }
    // if (filePath){
    //   const result = await getJsonData(filePath)
    //   if (result.error){
    //     setModal(modals.error)
    //     setModalError({
    //       title: result.error, 
    //       description: result.description,
    //       buttons: [
    //         {text: 'OK', onClick: () => {setModal(modals.startScreen)}},
    //       ]
    //     })
    //   } else if (result.data) {
    //     updateConfigurationService(result.data.ClientConfiguration)
    //     updateSideMenu()
    //     setModal(null)
    //     setAppData({configurationFilePath: filePath})
    //   }
    // }
  }

  return (
    <div style={{
      width: '600px',
      padding: '3%',
    }}>
      <div style={{
        display: 'flex',
        borderBottom: '5px #c7c7c7 solid',
        marginBottom: '15px',
        paddingBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingLeft: 20,
        paddingRight: 10
      }}>
        <h2>Open file</h2>
        <Button>Apply</Button>

      </div>
      <SelectFileBlock title={'UI file'} value={formData.uiPath} onClick={uiFileOpenClick}></SelectFileBlock>
      <SelectFileBlock title={'Working directory'} value={formData.workingDirPath}></SelectFileBlock>
      <SelectFileBlock title={'Project config'} value={formData.projectConfigPath}></SelectFileBlock>
    </div>
  )
}

interface SelectFileBlockProps {
  title: string
  value: string
  onClick?(): void
}

function SelectFileBlock({ title, value, onClick }: SelectFileBlockProps) {
  return (
    <div style={{ width: '100%', marginBottom: '5%', paddingBottom: 10, borderBottom: '1px #c7c7c7 solid' }}>
      <div style={{ textAlign: 'center' }}><h3 style={{ color: 'gray' }}>{title}</h3></div>
      <div
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
        }}
      >
        <div style={{ textAlign: 'center', width: '100%' }}><p >{value}</p></div>
        <Button onClick={onClick}>Open</Button>
      </div>
    </div>
  )
}