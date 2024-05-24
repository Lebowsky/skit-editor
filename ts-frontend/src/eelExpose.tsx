import { eel } from "./App";
import { IDataResponceCommon, IFileOpenResponse, IProjectPathsData } from "./models/apiResponces";

export async function askFile(fileType: string): Promise <IDataResponceCommon> {
  return eel.ask_file(fileType)();
}

export async function getJsonData(data: IProjectPathsData) {
  return eel.get_configuration_from_file(data)();
}

export async function saveFileContent(filePath: string, content: {[key: string]: any}){
  return eel.save_file_content(filePath, content)();
}

export async function getProjectPathsData(): Promise <IFileOpenResponse> {
  return eel.get_project_paths_data()();
}

export async function getWorkingDirPath(): Promise <IFileOpenResponse> {
  return eel.get_working_dir_path()();
}

export async function projectConfigPath(): Promise <IFileOpenResponse> {
  return eel.get_project_config_path()();
}


