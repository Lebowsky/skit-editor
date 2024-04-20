import MainParamsCVFrame from "./MainParams/MainParamsCVFrame";
import HandlersList from "./ParamsLists/HandlersList";

export default function ParamsProcess({ content, handlers }) {
  return (
    <>
      <MainParamsCVFrame data={content}></MainParamsCVFrame>
      <HandlersList data={handlers}></HandlersList>
    </>
  )
}