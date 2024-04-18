import ParamsLinearLayout from "../../views/ParamsElements/ParamsLinearLayout"
import Modal from "../Inputs/Modal/Modal"
import { Params } from "../Inputs/Modal/ParamsModal"

export default function ParamsDetails({ data }) {
  return (
    <Modal isOpen={true}>
      <Params data={data}>
        {data.content.type === "LinearLayout" && <ParamsLinearLayout data={data}></ParamsLinearLayout>}
      </Params>
    </Modal>
  )
}