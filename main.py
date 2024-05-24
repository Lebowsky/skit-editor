import platform

import eel

from handlers import eel_handlers


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
