// import ParamsBlockWrapper from "../../components/forms/ParamsBlockWrapper";
import { useSimpleUI } from "../../context/context";
// import Button, { ButtonGroup } from "../../Inputs/Button/Button";
// import ListView from "../../Inputs/ListView";
// import ParamsBlockWrapper from "../ParamsBlockWrapper";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function HandlersList({ data }) {
  const { setCurrentDetails } = useSimpleUI()
  function onListClick(itemId) {
    setCurrentDetails(data.filter(el => el.id === itemId)?.[0])
  }
  return (<></>
    // <ParamsBlockWrapper>
    // </ParamsBlockWrapper>
    // <ParamsBlockWrapper>
    //   <div className="list-wrapper">
    //     <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', marginBottom: '5px' }}>
    //       <h3 className="list-header">Handlers<i className="fa fa-chevron-up" aria-hidden="true"></i></h3>
    //       <ButtonGroup>
    //         <Button>Add</Button>
    //         <Button>Paste</Button>
    //       </ButtonGroup>
    //     </div>
    //     <ListView data={data} onClick={onListClick} listKeys={['event', 'method', 'type']}></ListView>
    //   </div>
    // </ParamsBlockWrapper>
  )
}