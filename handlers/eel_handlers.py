import json

import eel

from models.api_responces import (
    FileOpenResponse,
    ErrorResponce,
    DataResponceCommon,
    ProjectPathsData
)
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
def get_json_data(data: dict) -> dict:
    paths = ProjectPathsData(**data)
    if paths.ui_path:
        with open(paths.ui_path, encoding='utf-8') as fp:
            data = {}
            error = None
            try:
                data = json.load(fp)
            except json.JSONDecodeError as e:
                error = ErrorResponce(
                    type=str(type(e)),
                    title='Error decode json data',
                    detail=str(e)
                ).dict()
            except Exception as e:
                error = ErrorResponce(
                    type=str(type(e)),
                    title='Unknown error',
                    detail=str(e)
                ).dict()

            return DataResponceCommon(data=data, error=error).dict(exclude_none=True)


@eel.expose
def save_file_content(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as fp:
        try:
            json.dump(content, fp, ensure_ascii=False, indent=4)
            return {'result': True}
        except Exception as e:
            return {'error': type(e), 'description': str(e)}
