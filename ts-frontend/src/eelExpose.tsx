import { eel } from "./App";
import { DataResponce, UIFileOpenResponse } from "./models/apiResponces";

export async function askFile(fileType: string): Promise <DataResponce> {
  return eel.ask_file(fileType)();
};

export async function getJsonData(filePath: string) {
  return eel.get_json_data(filePath)();
};

export async function saveFileContent(filePath: string, content: {[key: string]: any}){
  return eel.save_file_content(filePath, content)();
}

export async function getProjectPathsData(): Promise <UIFileOpenResponse> {
  return eel.get_project_paths_data()();
};

