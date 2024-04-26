import { useState } from "react"
import { IListContent } from "../models/Content"

interface ListViewProps{
  listKeys: string[],
  data: IListContent[],
  children?: React.ReactNode,
  onClickItem(id: number): void,
  selectedItemId: number | null
}
export default function ListView({ data, listKeys, selectedItemId, onClickItem }: ListViewProps) {

  function handleDoubleClick(id: number) {
    // setCurrentDetails(data.filter(el => el.id === id)?.[0])
  }
  return (
    <ul className="list">
      {data.map(({ id, content, nestedElements }, idx) => (
        <ListRow
          key={idx}
          data={listKeys.map(key => content[key]?.toString())}
          hasNested={nestedElements && nestedElements.length > 0}
          onClick={() => onClickItem(id)}
          // onDoubleClick={() => handleDoubleClick(id)}
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
        </ListRow>
      ))}
    </ul>
  )
}

interface ListRowProps {
  data: string[]
  children: React.ReactNode
  hasNested: boolean,
  isSelected: boolean,
  onClick(): void
}
// function ListRow({ data, children, hasNested, onClick, isSelected, onDoubleClick }) {
function ListRow({ data, children, hasNested, isSelected, onClick }: ListRowProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const iconClassName = isOpened ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
  
  function getBackground() {
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
          background: getBackground(),
          borderBottom: '1px solid #ccc'
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClick}
        // onDoubleClick={onDoubleClick}
      >
        {hasNested && <i className={iconClassName} aria-hidden="true" onClick={() => setIsOpened((prev) => !prev)}></i>}
        <ListItem data={data}></ListItem>
      </div>
      {isOpened && children}
    </li >
  )
}

interface ListItemProps{
  data: string[]
}
function ListItem({ data }: ListItemProps) {
  const width = [20, 50, 30]
  return (
    <>
      {data.map((el, idx) => <i key={idx} style={{ width: `${width[idx]}%` }}>{el}</i>)}
    </>
  )
}