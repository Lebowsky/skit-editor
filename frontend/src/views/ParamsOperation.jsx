import ElementsList from "./Lists/Elements/ElementsList"
import HandlersList from "./Lists/Handlers/HandlersList"
import MainParamsOperation from "./MainParams/MainParamsOperation/MainParamsOperation"

export default function ParamsOperation({ content, elements, handlers }) {
  return (
    <>
      <MainParamsOperation data={content}></MainParamsOperation>
      <ElementsList data={elements}></ElementsList>
      <HandlersList data={handlers}></HandlersList>
    </>
  )
}