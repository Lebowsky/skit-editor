import { eel } from "./App";

export async function askFile(fileType: string) {
  return eel.ask_file(fileType)();
};

export async function getJsonData(filePath: string) {
  return eel.get_json_data(filePath)();
};

export async function saveFileContent(filePath: string, content: {[key: string]: any}){
  return eel.save_file_content(filePath, content)();
}