import CSS from "csstype";
import { IListContent } from "../models/Content"
import { useState } from "react";
import { contextTypes } from "../models/ContextConfiguration";

interface ListViewProps {
  listKeys: string[],
  data: IListContent[]
  children?: React.ReactNode,
  onClickItem(id: number): void,
  selectedItemId: number | null,
  onDoubleClickItem(id: number, contextType: contextTypes): void
}
export default function ListView({ data, listKeys, selectedItemId, onClickItem, onDoubleClickItem }: ListViewProps) {
  return (
    <ul className="list">
      {data.map(({ id, content, nestedElements, contextType }, idx) => (
        <ListRow
          key={idx}
          data={listKeys.map(key => content[key]?.toString())}
          hasNested={nestedElements && nestedElements.length > 0}
          onClick={() => onClickItem(id)}
          onDoubleClick={() => onDoubleClickItem(id, contextType)}
          isSelected={id === selectedItemId}
        >
          {nestedElements &&
            <ListView
              data={nestedElements}
              listKeys={listKeys}
              selectedItemId={selectedItemId}
              onClickItem={onClickItem}
              onDoubleClickItem={onDoubleClickItem}
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
  onClick(): void,
  onDoubleClick?(): void
}
function ListRow({ data, children, hasNested, isSelected, onClick, onDoubleClick }: ListRowProps) {
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
          borderBottom: '1px solid #ccc',
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      >
        {hasNested &&
          <i
            className={iconClassName}
            aria-hidden="true"
            style={{
              paddingRight: 5,
            }}
            onClick={() => setIsOpened((prev) => !prev)}
          />}
        <ListItem data={data}></ListItem>
      </div>
      {isOpened && children}
    </li >
  )
}

interface ListItemProps {
  data: string[]
}
function ListItem({ data }: ListItemProps) {
  const styles: CSS.Properties[] = [
    {
      width: '30%',
      // marginRight: '1rem',
      userSelect: 'none',
      overflow: "hidden",
      textOverflow: 'ellipsis',
    },
    {
      width: '40%',
      marginRight: '1rem',
      userSelect: 'none',
      overflow: "hidden",
      textOverflow: 'ellipsis',
      textAlign: 'center'
    },
    {
      width: '30%',
      userSelect: 'none',
      overflow: "hidden",
      textOverflow: 'ellipsis',
      textAlign: 'center'
    },
  ]

  return (
    <>
      {data.map((el, idx) =>
        <i key={idx} style={styles[idx]}>{el} </i>)}
    </>
  )
}