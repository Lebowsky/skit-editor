import platform

import eel
import json

from services import ui_service, dialogs
from models.api_responces import ErrorResponce, DataResponce, UIFileOpenResponse


@eel.expose
def ask_file(file_type):
    """ Ask the user to select a file """
    return dialogs.ask_file(file_type)


@eel.expose
def get_project_paths_data():
    data = ui_service.get_project_paths_data()
    if data:
        return UIFileOpenResponse(data=data).dict()


@eel.expose
def get_json_data(file_path: str) -> dict:
    with open(file_path, encoding='utf-8') as fp:
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

        return DataResponce(data=data, error=error).dict(exclude_none=True)


def get_base64_data(file_path: str):
    pass


@eel.expose
def save_file_content(file_path, content):
    with open(file_path, 'w', encoding='utf-8') as fp:
        try:
            json.dump(content, fp, ensure_ascii=False, indent=4)
            return {'result': True}
        except Exception as e:
            return {'error': type(e), 'description': str(e)}


def start_eel(develop):
    if develop:
        directory = 'ts-frontend/src'
        app = None
        page = {'port': 3000}
    else:
        directory = 'ts-frontend/build'
        app = 'chrome-app'
        page = 'index.html'

    eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])

    eel_kwargs = dict(
        host='localhost',
        port=8080,
        size=(1280, 800)
    )

    try:
        print('eel started')
        eel.start(page, mode=app, **eel_kwargs)
    except EnvironmentError:
        if sys.platform in ['win32', 'win64'] and int(
                platform.release()) >= 10:
            eel.start(page, mode='edge', **eel_kwargs)
        else:
            raise


if __name__ == '__main__':
    import sys

    # start_eel(develop=len(sys.argv) == 2)
    start_eel(True)