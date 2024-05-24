export interface IDataResponceCommon {
  data?: { [key: string]: string }
  error?: IErrorResponce
}

export interface IErrorResponce {
  type: string
  title: string
  detail: string
}

export interface IProjectPathsData {
  ui_path?: string
  working_dir_path?: string
  project_config_path?: string
}

export interface IConfigDataRequest {
  uiPath: string
  workingDirPath?: string
  projectConfigPath?: string
}

export interface IFileOpenResponse extends Omit<IDataResponceCommon, 'data'> {
  data: IProjectPathsData
}
