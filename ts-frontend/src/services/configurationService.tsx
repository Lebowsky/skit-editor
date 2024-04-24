import { IConfigurationContext, IListItem, contextTypes } from "../models/ContextConfiguration"

type JsonItem = { [key: string]: any }

export class ConfigurationService {
  private raw_data: JsonItem
  private id: number
  private processes: IListItem[] = []
  private operations: IListItem[] = []
  private handlers: IListItem[] = []
  private elements: IListItem[] = []

  constructor(raw_data: JsonItem) {
    this.raw_data = raw_data
    this.id = 0
  }

  public getConfigurationContext(): IConfigurationContext {
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

    return {
      root: root,
      processes: this.processes,
      operations: this.operations,
      elements: this.elements,
      handlers: this.handlers
    }
  }

  public getConfigurationJson(): {[key: string]: any}{
    return {}
  }

  private parseProcesses(Processes: JsonItem[]): void {
    Processes.forEach(({ Operations, CVFrames, ...item }) => {
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

