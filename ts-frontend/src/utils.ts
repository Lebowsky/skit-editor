import { IListItem } from "./models/ContextConfiguration"
import { ISideMenuItem } from "./models/SideMenu"

export const getSideMenu = (processes: IListItem[], operations: IListItem[]): ISideMenuItem[] => {
  const nestedItems: ISideMenuItem[] = []
  const sideMenuData: ISideMenuItem[] = [
    { type: 'MainMenu', title: 'Main menu' },
    { type: 'StyleTemplates', title: 'Styles' },
    { type: 'StartScreen', title: 'Start screen' },
    { type: 'Processes', title: 'Processes', nestedItems: nestedItems },
    { type: 'Shedulers', title: 'Shedulers' },
    { type: 'CommonHandlers', title: 'Common handlers' },
    { type: 'PyFiles', title: 'Python files' },
    { type: 'Mediafile', title: 'Media files' },
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


// export const saveConfigurationJson = (confData) => {
//   const confJson = {'ClientConfiguration' : {}}
  
//   function getHandlers(parentId){
//     return confData.handlers
//       .filter(item => item.parentId === parentId)
//       .map(item => item.content)
//   }

//   function getElements(parentId){
//     return confData.elements
//       .filter(item => item.parentId === parentId)
//       .map(item => {
//         const elements = getElements(item.id)
//         const handlers = getHandlers(item.id)

//         if (elements.length) return {...item.content, Elements: elements}
//         if (handlers.length) return {...item.content, Handlers: handlers}
//         else return item.content
//       })
//   }

//   function getOperations(parentId){
//     return confData.Operation
//       .filter(item => item.parentId === parentId)
//       .map(item => ({...item.content, Elements: getElements(item.id), Handlers: getHandlers(item.id)}))
//   }

//   function getProcesses(){
//     return confData.Process.map(item => {
//       const nestedItems = {[{Process: 'Operations', CVOperation: 'CVFrames'}[item.content.type]]: getOperations(item.id)}
//       return {
//         ...item.content, 
//         ...nestedItems
//       }
//     })
//   }

//   confJson.ClientConfiguration = {
//     ...confData.root,
//     ConfigurationSettings: confData.configurationSettings,
//     MainMenu: confData.mainMenu,
//     Mediafile: confData.mediaFiles,
//     PyTimerTask: confData.timers,
//     PyFiles: confData.pyFiles,
//     StyleTemplates: confData.styleTemplates,
//     CommonHandlers: confData.commonHandlers,
//     Processes: getProcesses(),
//   }
//   return confJson
// }

export function getUrl(method: string){
  const BASE_URL = process.env.REACT_APP_BASE_URL
  if (BASE_URL) {
    return BASE_URL.endsWith('/') ?
      `${BASE_URL}${method}` :
      `${BASE_URL}/${method}`;
  }
  throw new Error("BASE_URL not specified")
}