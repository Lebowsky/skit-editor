import { IContent, IListContent } from "../models/Content"
import { IConfigurationContext, IListItem, contextTypes } from "../models/ContextConfiguration"
import { ISideMenuItem } from "../models/SideMenu"

type JsonItem = {type: string, [key: string]: any }

export class ConfigurationService {
  private raw_data: {[key: string]: any}
  private id: number
  private root: {[key: string]: any} = {}
  private processes: IListItem[] = []
  private operations: IListItem[] = []
  private handlers: IListItem[] = []
  private elements: IListItem[] = []

  constructor(raw_data: {[key: string]: any}) {
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
  public getSideMenu (processes: IListItem[], operations: IListItem[]): ISideMenuItem[]{
    const nestedItems: ISideMenuItem[] = []
    const sideMenuData: ISideMenuItem[] = [
      { type: 'MainMenu', title: 'Main menu', id: 0, contextType: contextTypes.mainMenu },
      { type: 'StyleTemplates', title: 'Styles', id: 0, contextType: contextTypes.styleTemplates},
      { type: 'StartScreen', title: 'Start screen', id: 0, contextType: contextTypes.startScreen },
      { type: 'Processes', title: 'Processes', nestedItems: nestedItems, id: 0, contextType: contextTypes.processes},
      { type: 'Shedulers', title: 'Shedulers', id: 0, contextType: contextTypes.shedulers },
      { type: 'CommonHandlers', title: 'Common handlers', id: 0, contextType: contextTypes.commonHandlers },
      { type: 'PyFiles', title: 'Python files', id: 0, contextType: contextTypes.pyFiles },
      { type: 'Mediafile', title: 'Media files', id: 0, contextType: contextTypes.mediafiles },
    ]
  
    processes.forEach(({ content: { ProcessName, CVOperationName, type }, id }) => {
      const title = ProcessName || CVOperationName
      nestedItems.push({
        title: title,
        type: type,
        id: id,
        nestedItems: operations
          .filter(el => el.parentId === id)
          .map(({ content, id }) => ({ title: content.Name, type: content.type, id: id, contextType: contextTypes.operations })),
        contextType: contextTypes.processes
      })
    })
    return sideMenuData
  }
  public getItemContent(id: number, type: contextTypes): IContent{
    const getElements = (parentId: number): IListContent[] => {
      return this.elements
        .filter(el => el.parentId === parentId)
        .map(el => ({ ...el, nestedElements: getElements(el.id) }))
    }

    const itemContent = this.getContextItems(type).filter(item => item.id === id).map(item => ({...item}))?.[0]
    if (itemContent){
      itemContent.elements = getElements(id)
      itemContent.handlers = this.handlers.filter(el => el.parentId === id).map(el => ({...el, nestedElements: []}))
    } 
    console.log(itemContent)
    return itemContent
  }
  public updateItemContent(itemData: IContent): void{
    const item = this.findItem(itemData.id, itemData.contextType)
    item.content = {...itemData.content}
  }
  private findItem(id: number, contextType: contextTypes): IContent{
    return this.getContextItems(contextType).filter(item => item.id === id).map(item => (item))?.[0]
  }
  private getContextItems(type: contextTypes): IContent[]{
    return {
      [contextTypes.processes]: this.processes,
      [contextTypes.operations]: this.operations,
      [contextTypes.elements]: this.elements,
      [contextTypes.handlers]: this.handlers,
      [contextTypes.mainMenu]: this.processes,
      [contextTypes.styleTemplates]: this.processes,
      [contextTypes.startScreen]: this.processes,
      [contextTypes.shedulers]: this.processes,
      [contextTypes.commonHandlers]: this.processes,
      [contextTypes.pyFiles]: this.processes,
      [contextTypes.mediafiles]: this.processes,
    }[contextTypes[type]] 
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

