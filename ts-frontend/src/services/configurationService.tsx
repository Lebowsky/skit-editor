import { IConfigurationContext, IListItem, contextTypes } from "../models/ContextConfiguration"

type JsonItem = { [key: string]: any }

export class ConfigurationService {
  private raw_data: JsonItem
  private id: number
  private root: {[key: string]: any} = {}
  private processes: IListItem[] = []
  private operations: IListItem[] = []
  private handlers: IListItem[] = []
  private elements: IListItem[] = []

  constructor(raw_data: JsonItem) {
    this.raw_data = raw_data
    this.id = 0
    const {
      Processes,
      PyFiles,
      CommonHandlers,
      Mediafile,
      MainMenu,
      ConfigurationSettings,
      PyTimerTask,
      StyleTemplates,
      ...root
    } = this.raw_data

    this.parseProcesses(Processes)
    this.root = root
  }

  public getConfigurationContext(): IConfigurationContext {
    return {
      root: this.root,
      processes: this.processes,
      operations: this.operations,
      elements: this.elements,
      handlers: this.handlers
    }
  }

  public getConfigurationJson(): {[key: string]: any}{
    const confJson = {'ClientConfiguration' : {}}
    confJson.ClientConfiguration = {
        ...this.raw_data,
        ...this.root,
      //     ConfigurationSettings: confData.configurationSettings,
      //     MainMenu: confData.mainMenu,
      //     Mediafile: confData.mediaFiles,
      //     PyTimerTask: confData.timers,
      //     PyFiles: confData.pyFiles,
      //     StyleTemplates: confData.styleTemplates,
      //     CommonHandlers: confData.commonHandlers,
          Processes: this.getProcesses(),
      }
    return confJson
  }

  public getItemContent(id: number, type: string){
    console.log(id, type)
    
    // function getElements(parentId) {
    //   return configuration.elements
    //     .filter(el => el.parentId === parentId)
    //     .map(el => ({ ...el, nestedElements: getElements(el.id) }))
    // }

    // const newContent = { ...configuration[type]?.filter(el => el.id === id)?.[0] }
    // newContent['elements'] = getElements(id)
    // newContent['handlers'] = configuration.handlers.filter(el => el.parentId === id)
    // return newContent
  }

  private getContentType(type: string){
    switch (type){
      case 'CVOperation':
        return 'Process'
      case 'CVFrame':
        return 'Operation'
      default:
        return type
    }
  }

  private getProcesses(): {[key: string]: any}[]{
    return this.processes.map(item => {
      const nestedKeys: {[key: string]: string} = { Process: 'Operations', CVOperation: 'CVFrames' }
      const nestedItems = { [nestedKeys[item.content.type]]: this.getOperations(item.id) }
      return {
        ...item.content,
        ...nestedItems
      }
    })
  }

  private getOperations(parentId: number): {[key: string]: any}[]{
    return this.operations
      .filter(item => item.parentId === parentId)
      .map(item => ({...item.content, Elements: this.getElements(item.id), Handlers: this.getHandlers(item.id)}))
  }

  private getHandlers(parentId: number): {[key: string]: any}[]{
    return this.handlers
      .filter(item => item.parentId === parentId)
      .map(item => item.content)
  }

  private getElements(parentId: number): {[key: string]: any}[]{
    return this.elements
      .filter(item => item.parentId === parentId)
      .map(item => {
        const elements = this.getElements(item.id)
        const handlers = this.getHandlers(item.id)

        if (elements.length) return {...item.content, Elements: elements}
        if (handlers.length) return {...item.content, Handlers: handlers}
        else return item.content
      })
  }

  private parseProcesses(Processes: JsonItem[]): void {
    Processes && Processes.forEach(({ Operations, CVFrames, ...item }) => {
      const id = this.getId()
      this.processes.push({
        id: id,
        parentId: 0,
        contextType: contextTypes.processes,
        content: item
      })
      Operations && this.parseOperations(Operations, id)
      CVFrames && this.parseCVFrames(CVFrames, id)
    });
  }

  private parseOperations(Operations: JsonItem[], parentId: number): void {
    Operations.forEach(({ Elements, Handlers, ...item }) => {
      const id = this.getId()
      this.operations.push({
        id: id,
        parentId: parentId,
        contextType: contextTypes.operations,
        content: item
      })
      Elements && this.parseElements(Elements, id)
      Handlers && this.parseHandlers(Handlers, id)
    })
  }
  private parseCVFrames(frames: JsonItem[], parentId: number): void {
    frames.forEach(({ Handlers, ...item }) => {
      const id = this.getId()
      this.operations.push({
        id: id,
        parentId: parentId,
        contextType: contextTypes.operations,
        content: item
      })
      Handlers && this.parseHandlers(Handlers, id)
    })
  }
  private parseElements (elms: JsonItem[], parentId: number){
    elms.forEach(({ Elements, ...item }) => {
      const id = this.getId()
      this.elements.push({ 
        id: id, 
        parentId: parentId, 
        contextType: contextTypes.elements, 
        content: item 
      })
      Elements && this.parseElements(Elements, id)
    })
  }
  private parseHandlers (hls: JsonItem[], parentId: number): void {
    hls.forEach(({...item}) => {
      const id = this.getId()
      this.handlers.push({ 
        id: id, 
        parentId: 
        parentId, 
        contextType: contextTypes.handlers, 
        content: item 
      })
    })
  }
  private getId(): number {
    return ++this.id
  }
}

