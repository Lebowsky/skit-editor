import ParamsLinearLayout from "./LinearLayout/ParamsLinearLayout"
import Modal from "../../components/layouts/Modal"

export default function ParamsDetails({ data }) {
  return (
    <Modal isOpen={true}>
      <Params data={data}>
        {data.content.type === "LinearLayout" && <ParamsLinearLayout data={data}></ParamsLinearLayout>}
      </Params>
    </Modal>
  )
}

export function Params({ data, children }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'start',
      width: '100%',
      maxWidth: '550px',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  )
}