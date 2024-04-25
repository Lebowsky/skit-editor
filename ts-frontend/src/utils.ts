import { IListItem } from "./models/ContextConfiguration"
import { ISideMenuItem } from "./models/SideMenu"

export const getSideMenu = (processes: IListItem[], operations: IListItem[]): ISideMenuItem[] => {
  const nestedItems: ISideMenuItem[] = []
  const sideMenuData: ISideMenuItem[] = [
    { type: 'MainMenu', title: 'Main menu', id: 0 },
    { type: 'StyleTemplates', title: 'Styles', id: 0 },
    { type: 'StartScreen', title: 'Start screen', id: 0 },
    { type: 'Processes', title: 'Processes', nestedItems: nestedItems, id: 0 },
    { type: 'Shedulers', title: 'Shedulers', id: 0 },
    { type: 'CommonHandlers', title: 'Common handlers', id: 0 },
    { type: 'PyFiles', title: 'Python files', id: 0 },
    { type: 'Mediafile', title: 'Media files', id: 0 },
  ]

  processes.forEach(({ content: { ProcessName, CVOperationName, type }, id }) => {
    const title = ProcessName || CVOperationName
    nestedItems.push({
      title: title,
      type: type,
      id: id,
      nestedItems: operations
        .filter(el => el.parentId === id)
        .map(({ content, id }) => ({ title: content.Name, type: content.type, id: id }))
    })
  })
  return sideMenuData
}

export function getUrl(method: string){
  const BASE_URL = process.env.REACT_APP_BASE_URL
  if (BASE_URL) {
    return BASE_URL.endsWith('/') ?
      `${BASE_URL}${method}` :
      `${BASE_URL}/${method}`;
  }
  throw new Error("BASE_URL not specified")
}