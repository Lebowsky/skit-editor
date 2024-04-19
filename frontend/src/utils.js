export const convertConfiguration = (data) => {
  const {
    Processes,
    PyFiles,
    CommonHandlers,
    Mediafile,
    MainMenu,
    ConfigurationSettings,
    ...root
  } = data

  const [processes, operations, elements, handlers] = parseProcesses(Processes)
  return {
    root: root,
    Process: processes,
    Operation: operations,
    elements: elements,
    handlers: handlers,
    pyFiles: [],
    commonHandlers: [],
    mediaFiles: [],
    mainMenu: [],
    configurationSettings: ConfigurationSettings
  }
}

export const getSideMenu = (processes, operations) => {
  const nestedItems = []
  const sideMenuData = [
    { type: 'MainMenu', title: 'Main menu' },
    { type: 'StyleTemplates', title: 'Styles' },
    { type: 'StartScreen', title: 'Start screen' },
    { type: 'Processes', title: 'Processes', nestedItems: nestedItems },
    { type: 'Shedulers', title: 'Shedulers' },
    { type: 'CommonHandlers', title: 'Common handlers' },
    { type: 'PyFiles', title: 'Python files' },
    { type: 'Mediafile', title: 'Media files' },
  ]

  // const sideMenuData = []
  processes.forEach(({ content: { ProcessName: title, type }, id }) => {
    nestedItems.push({
      title: title,
      type: type,
      id: id,
      nestedItems: operations.filter(el => el.parentId === id).map(({ content, id }) => ({ title: content.Name, type: content.type, id: id }))
    })
  })
  return sideMenuData
}

const parseProcesses = (data) => {
  const processes = []
  const operations = []
  const elements = []
  const handlers = []
  let id = 0

  const getId = () => {
    id++
    return id
  }

  const parseElements = (elms, parentId, parentType = 'Elements') => {
    elms.forEach(({ Elements, ...item }) => {
      const id = getId()
      elements.push({ id: id, parentId: parentId, parentType: parentType, type: 'elements', content: item })
      Elements && parseElements(Elements, id, 'Operations')
    })
  }

  const parseHandlers = (hls, parentId) => {
    hls.forEach((item) => {
      const id = getId()
      handlers.push({ id: id, parentId: parentId, type: 'handlers', content: item })
    })
  }

  const parseOperations = (ops, parentId) => {
    ops.forEach(({ Elements, Handlers, ...item }) => {
      const id = getId()
      operations.push({ id: id, parentId: parentId, content: item })
      Elements && parseElements(Elements, id, 'Operations')
      Handlers && parseHandlers(Handlers, id)
    })
  }


  data.forEach(({ Operations, ...item }) => {
    const id = getId()
    processes.push({ id: id, content: item })
    Operations && parseOperations(Operations, id)
  });

  return [processes, operations, elements, handlers]
}