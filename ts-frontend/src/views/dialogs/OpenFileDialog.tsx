import Button from "../../components/inputs/Button";
import { useSimpleUI } from "../../context/context";
import { IContextProviderData } from "../../models/ContextConfiguration";

export default function OpenFileDialog() {
  const { setModal } = useSimpleUI() as IContextProviderData

  const defaultTitle = '<Not selected>'
  return (
    <div style={{
      width: '600px',
      padding: '3%'
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
        <i
          className="tab-icon fa fa-times"
          aria-hidden="true"
          onClick={() => setModal(null)} 
          style={{ fontSize: 18, cursor: 'pointer' }}
        />
      </div>
      <SelectFileBlock title={'UI file'} value={defaultTitle}></SelectFileBlock>
      <SelectFileBlock title={'Working directory'} value={defaultTitle}></SelectFileBlock>
      <SelectFileBlock title={'Project config'} value={defaultTitle}></SelectFileBlock>
    </div>
  )
}

interface SelectFileBlockProps {
  title: string
  value: string
}

function SelectFileBlock({ title, value }: SelectFileBlockProps) {
  return (
    <div style={{ width: '100%', marginBottom: '5%', paddingBottom: 10, borderBottom: '1px #c7c7c7 solid' }}>
      <h3 style={{ textAlign: 'center', paddingRight: '45%', color: 'gray' }}>{title}</h3>
      <div
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'
        }}
      >
        <p style={{ paddingLeft: '15%' }}>{value}</p>
        <Button>Open</Button>
      </div>
    </div>
  )
}