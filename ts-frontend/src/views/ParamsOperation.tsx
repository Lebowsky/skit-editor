// import ElementsList from "./ParamsLists/ElementsList"
// import HandlersList from "./ParamsLists/HandlersList"
// import MainParamsOperation from "./MainParams/MainParamsOperation"

import CommonParamsOperation from "./CommonParams/CommonParamsOperation";
import ElementsList from "./ListsParams/ElementsList";

export default function ParamsOperation() {
  return (
    <>
      <CommonParamsOperation/>
      <ElementsList/>
    </>
    //   <HandlersList data={handlers}></HandlersList> */
  )
}