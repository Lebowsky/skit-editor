import { useState } from "react"

export default function ListView({ data, listKeys }) {
  return (
    <ul className="list">
      {data.map(({ id, content, nestedElements }, idx) => (
        <ListRow 
          key={idx} 
          data={listKeys.map(key => content[key])} 
          hasNested={nestedElements && nestedElements.length > 0}
        >
          {nestedElements && 
            <ListView 
              data={nestedElements} 
              listKeys={listKeys}
            >
            </ListView>
          }
        </ListRow>)
      )}
    </ul>
  )
}
function ListRow({ data, children, hasNested }) {
  const [isOpened, setIsOpened] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const iconClassName = isOpened ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
  
  return (
    <li 
      style={{
        padding: '3px',
        borderRadius: '5px',
        marginLeft: '5px',
      }}
      onClick={() => {setIsSelected((prev) => !prev)}}
    >
      <div 
        style={{ 
          display: 'flex', 
          padding: 10,
        }}
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