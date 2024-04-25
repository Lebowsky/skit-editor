import { useSimpleUI } from "../../context/context";
import { IContent } from "../../models/Content";
import { IContextProviderData } from "../../models/ContextConfiguration";
import { InputFieldType, ParamInputProps } from "../../models/Inputs";
import Button, { ButtonGroup } from "../inputs/Button";
import ParamInput from "../inputs/ParamInput"


interface MainParamsFormProps {
  fields: InputFieldType[]
  onSubmit(e: React.FormEvent): void
  title: string
}
export default function MainParamsForm({ fields, onSubmit, title }: MainParamsFormProps) {
  const { currentContent } = useSimpleUI() as IContextProviderData
  return (
    <ParamsFormWrapper onSubmit={onSubmit}>
      <ParamsBlockTitle onClick={()=>{}}>{title}</ParamsBlockTitle>
      {currentContent && fields.map((el, idx) => (<ParamInput {...el} value={currentContent.content[el.name]} key={idx} />))}
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
        margin: '0 1% 20px 1%',
        width: '100%',
        minWidth: '500px',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px #33333326',
      }}
      onSubmit={onSubmit}>
      {children}
    </form>
  )
}

interface ParamsBlockTitleProps {
  children: React.ReactNode
  onClick(): void
}
function ParamsBlockTitle({ children, onClick }: ParamsBlockTitleProps) {
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
        <Button onClick={onClick} btnType='apply'>Apply</Button>
      </ButtonGroup>
    </div>
  )
}

// export function getParamValue(param) {
//   switch (param.type) {
//     case 'text':
//       return param.value
//     case 'checkbox':
//       return param.checked
//     default:
//       return param.value
//   }
// }