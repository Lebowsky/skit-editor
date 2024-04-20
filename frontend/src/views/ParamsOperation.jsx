import ElementsList from "./ParamsLists/ElementsList"
import HandlersList from "./ParamsLists/HandlersList"
import MainParamsOperation from "./MainParams/MainParamsOperation"

export default function ParamsOperation({ content, elements, handlers }) {
  return (
    <>
      <MainParamsOperation data={content}></MainParamsOperation>
      <ElementsList data={elements}></ElementsList>
      <HandlersList data={handlers}></HandlersList>
    </>
  )
}