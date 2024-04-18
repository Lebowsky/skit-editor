import { useState } from "react"
import { useSimpleUI } from "../../../context/context"

export default function ListView({ data, listKeys, onClickItem, selectedItemId }) {
  const { setCurrentDetails } = useSimpleUI()
  function handleDoubleClick(id){
    setCurrentDetails(data.filter(el => el.id === id)?.[0])
  }
  return (
    <ul className="list">
      {data.map(({ id, content, nestedElements }, idx) => (
        <ListRow 
          key={idx} 
          data={listKeys.map(key => content[key])} 
          hasNested={nestedElements && nestedElements.length > 0}
          onClick={() => onClickItem(id)}
          onDoubleClick={() => handleDoubleClick(id)}
          isSelected={id === selectedItemId}
        >
          {nestedElements && 
            <ListView 
              data={nestedElements}
              listKeys={listKeys}
              selectedItemId={selectedItemId} 
              onClickItem={onClickItem}
              
            >
            </ListView>
          }
        </ListRow>)
      )}
    </ul>
  )
}
function ListRow({ data, children, hasNested, onClick, isSelected, onDoubleClick }) {
  const [isOpened, setIsOpened] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const iconClassName = isOpened ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
  
  function getBackground(){
    switch (true) {
      case isSelected:
        return 'rgba(169, 169, 169)'
      case isHover:
        return 'rgba(169, 169, 169, .5)'
      default:
        return '#fff'
    }
  }
  return (
    <li 
      style={{
        padding: '3px',
        borderRadius: '5px',
        marginLeft: '5px',
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          padding: 10,
          background: getBackground()
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {hasNested && <i className={iconClassName} aria-hidden="true" onClick={() => setIsOpened((prev) => !prev)}></i>}
        {/* <div style={{background: isSelected ?  '#a9a9a9' : '#fff' }}> */}
          <ListItem data={data}></ListItem>
        {/* </div> */}
        
      </div>
      {isOpened && children}
    </li >
  )
}
function ListItem({ data }) {
  const width = [20, 50, 30]
  return (
    <>
      {data.map((el, idx) => <i key={idx} style={{ width: `${width[idx]}%` }}>{el}</i>)}
    </>
  )
}