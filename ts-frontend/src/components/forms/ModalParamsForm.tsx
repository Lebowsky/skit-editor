import { useSimpleUI } from "../../context/context"
import { IContextProviderData } from "../../models/ContextConfiguration"
import Button, { ButtonGroup } from "../inputs/Button"
import ParamInput from "../inputs/ParamInput"

interface ParamsFields {
  name: string
  type: string
  title: string
  options?: {[key: string]: string | boolean}
}

interface ModalParamsFormProps {
  fields: ParamsFields[],
  onSubmit(e: React.FormEvent): void
  title: string
}
export default function ModalParamsForm({ fields, onSubmit, title}: ModalParamsFormProps) {
  const { currentDetails } = useSimpleUI() as IContextProviderData
  console.log(currentDetails)
  return (
    currentDetails && <ParamsFormWrapper onSubmit={onSubmit}>
      <ParamsBlockTitle>{title}</ParamsBlockTitle>
      {fields.map((el, idx) => <ParamInput {...el} value={currentDetails.content[el.name] || ''} key={idx} />)}
    </ParamsFormWrapper>
  )
}

interface ParamsFormWrapperProps {
  onSubmit(e: React.FormEvent): void
  children: React.ReactNode
}
function ParamsFormWrapper({ onSubmit, children }: ParamsFormWrapperProps) {
  return (
    <form
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderRadius: '5px',
      }}
      onSubmit={onSubmit}>
      {children}
    </form>
  )
}

interface ParamsBlockTitleProps {
  children: React.ReactNode
}
function ParamsBlockTitle({ children }: ParamsBlockTitleProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        marginBottom: '10px',
        width: '100%',
        alignItems: 'baseline'
      }}>
      <h3>{children}</h3>
      <ButtonGroup>
        <Button>Apply</Button>
      </ButtonGroup>
    </div>
  )
}

