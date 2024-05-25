import Button from "../../components/inputs/Button";
import { getProjectPathsData, getWorkingDirPath, projectConfigPath } from "../../eelExpose";
import Modal from "../../components/layouts/Modal";
import useOpenFileDialog from "../../hooks/openFileDialog";


export default function OpenFileDialog() {
  const {formData, updateFormData, loadUiConfig} = useOpenFileDialog()

  async function uiFileOpenClick() {
    const result = await getProjectPathsData()
    updateFormData(result)
  }

  async function workingDirOpenClick() {
    const result = await getWorkingDirPath()
    updateFormData(result)
  }

  async function projectConfigOpenClick() {
    const result = await projectConfigPath()
    updateFormData(result)
  }

  async function applyOnClick() {
    await loadUiConfig()
  }

  return (
    <Modal allowClose={()=> (true)}>
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
          <Button onClick={applyOnClick}>Apply</Button>

        </div>
        <SelectFileBlock title={'UI file'} value={formData.uiPath} onClick={uiFileOpenClick}></SelectFileBlock>
        <SelectFileBlock title={'Working directory'} value={formData.workingDirPath} onClick={workingDirOpenClick}></SelectFileBlock>
        <SelectFileBlock title={'Project config'} value={formData.projectConfigPath} onClick={projectConfigOpenClick}></SelectFileBlock>
      </div>
    </Modal>
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