import { eel } from "./App";

export async function askFile(file_type: string) {
	return eel.ask_file(file_type)();
};