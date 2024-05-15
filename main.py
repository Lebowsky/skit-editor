import platform

import eel
import json

import dialogs


@eel.expose
def ask_file(file_type):
    """ Ask the user to select a file """
    return dialogs.ask_file(file_type)


@eel.expose
def get_json_data(file_path: str):
    with open(file_path, encoding='utf-8') as fp:
        result = {}
        try:
            result['data'] = json.load(fp)
        except json.JSONDecodeError as e:
            result['error'] = f'JSONDecodeError'
            result['description'] = str(e)

    return result


def get_base64_data(file_path: str):
    pass


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
