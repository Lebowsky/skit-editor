// export const convertConfiguration = (data) => {
//   const {
//     Processes,
//     PyFiles,
//     CommonHandlers,
//     Mediafile,
//     MainMenu,
//     ConfigurationSettings,
//     PyTimerTask,
//     StyleTemplates,
//     ...root
//   } = data

//   const [processes, operations, elements, handlers] = parseProcesses(Processes)

//   return {
//     root: root,
//     Process: processes,
//     Operation: operations,
//     // elements: elements,
//     // handlers: handlers,
//     // pyFiles: PyFiles || [],
//     // timers: PyTimerTask || [],
//     // commonHandlers: CommonHandlers || [],
//     // mediaFiles: Mediafile || [],
//     // mainMenu: MainMenu || [],
//     // styleTemplates: StyleTemplates || [],
//     // configurationSettings: ConfigurationSettings
//   }
// }

// export const getSideMenu = (processes, operations) => {
//   const nestedItems = []
//   const sideMenuData = [
//     { type: 'MainMenu', title: 'Main menu' },
//     { type: 'StyleTemplates', title: 'Styles' },
//     { type: 'StartScreen', title: 'Start screen' },
//     { type: 'Processes', title: 'Processes', nestedItems: nestedItems },
//     { type: 'Shedulers', title: 'Shedulers' },
//     { type: 'CommonHandlers', title: 'Common handlers' },
//     { type: 'PyFiles', title: 'Python files' },
//     { type: 'Mediafile', title: 'Media files' },
//   ]

//   processes.forEach(({ content: { ProcessName, CVOperationName, type }, id }) => {
//     const title = ProcessName || CVOperationName
//     nestedItems.push({
//       title: title,
//       type: type,
//       id: id,
//       nestedItems: operations.filter(el => el.parentId === id).map(({ content, id }) => ({ title: content.Name, type: content.type, id: id }))
//     })
//   })
//   return sideMenuData
// }

// const parseProcesses = (data) => {
//   const processes = []
//   const operations = []
//   const elements = []
//   const handlers = []
//   let id = 0

//   const getId = () => {
//     id++
//     return id
//   }

//   const parseElements = (elms, parentId, parentType = 'Elements') => {
//     elms.forEach(({ Elements, ...item }) => {
//       const id = getId()
//       elements.push({ id: id, parentId: parentId, parentType: parentType, type: 'elements', content: item })
//       Elements && parseElements(Elements, id, 'Operations')
//     })
//   }

//   const parseHandlers = (hls, parentId) => {
//     hls.forEach((item) => {
//       const id = getId()
//       handlers.push({ id: id, parentId: parentId, type: 'handlers', content: item })
//     })
//   }

//   const parseOperations = (ops, parentId) => {
//     ops.forEach(({ Elements, Handlers, ...item }) => {
//       const id = getId()
//       operations.push({ id: id, parentId: parentId, content: item })
//       Elements && parseElements(Elements, id, 'Operations')
//       Handlers && parseHandlers(Handlers, id)
//     })
//   }

//   const parseCVFrames = (frames, parentId) => {
//     frames.forEach(({ Handlers, ...item }) => {
//       const id = getId()
//       operations.push({ id: id, parentId: parentId, content: item })
//       Handlers && parseHandlers(Handlers, id)
//     })
//   }

//   data.forEach(({ Operations, CVFrames, ...item }) => {
//     const id = getId()
//     processes.push({ id: id, content: item })
//     Operations && parseOperations(Operations, id)
//     CVFrames && parseCVFrames(CVFrames, id)
//   });

//   return [processes, operations, elements, handlers]
// }

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