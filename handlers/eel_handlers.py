import json

import eel

from models.api_responces import FileOpenResponse
from services import dialogs, ui_service


@eel.expose
def ask_file(file_type):
    """ Ask the user to select a file """
    return dialogs.ask_file(file_type)


@eel.expose
def get_project_paths_data():
    data = ui_service.get_project_paths_data()
    if data:
        return FileOpenResponse(data=data).dict()


@eel.expose
def get_working_dir_path():
    data = ui_service.get_working_dir_path()
    if data:
        return FileOpenResponse(data=data).dict()


@eel.expose
def get_project_config_path():
    data = ui_service.get_project_config_path()
    if data:
        return FileOpenResponse(data=data).dict()


@eel.expose
def get_configuration_from_file(data: dict) -> dict:
    return ui_service.get_configuration_from_file(data).dict()


@eel.expose
def get_new_configuration():
    return ui_service.get_new_configuration()


@eel.expose
def save_file_content(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as fp:
        try:
            json.dump(content, fp, ensure_ascii=False, indent=4)
            return {'result': True}
        except Exception as e:
            return {'error': type(e), 'description': str(e)}


if __name__ == '__main__':
    print(get_new_configuration())
