import ElementsList from "./Lists/Elements/ElementsList"
import HandlersList from "./Lists/Handlers/HandlersList"
import MainParamsOperation from "./MainParams/MainParamsOperation/MainParamsOperation"

export default function ParamsOperation({ content, elements, handlers }) {
  return (
    <>
      <MainParamsOperation data={content}></MainParamsOperation>
      <ElementsList data={elements}></ElementsList>
      <HandlersList data={handlers}></HandlersList>


      {/* <ParamsBlockWrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', marginBottom: '10px', width: '100%' }}>
          <h3 className="list-header">Common<i className="fa fa-chevron-up" aria-hidden="true"></i></h3>
        </div>
        <TextView value={content.Name} key={Math.random()} variable='name' title='Name'></TextView>
        <CheckBox title='Hide top bar' checked={content.hideToolBarScreen}></CheckBox>
        <CheckBox title='Hide button bar' checked={content.hideBottomBarScreen}></CheckBox>
        <CheckBox title='Disable scrolling for Root Layout' checked={content.noScroll}></CheckBox>
        <CheckBox title='Close without confirmation' checked={content.noConfirmation}></CheckBox>
      </ParamsBlockWrapper>
      <ElementsList data={elements}></ElementsList>
      <HandlersList data={handlers}></HandlersList> */}
    </>
  )
}