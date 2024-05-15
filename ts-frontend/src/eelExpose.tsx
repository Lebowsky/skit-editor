import { eel } from "./App";

export async function askFile(fileType: string) {
  return eel.ask_file(fileType)();
};

export function getJsonData(filePath: string) {
  return eel.get_json_data(filePath)();
};