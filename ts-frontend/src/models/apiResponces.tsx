export interface DataResponce {
  data?: { [key: string]: string }
  error?: ErrorResponce
}

export interface ErrorResponce {
  type: string
  title: string
  detail: string
}

export interface ProjectPathsData {
  ui_path: string
  working_dir_path: string
  project_config_path: string
}

export interface UIFileOpenResponse extends Omit<DataResponce, 'data'>{
  data: ProjectPathsData
}