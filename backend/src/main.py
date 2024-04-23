from config import settings

from api.app import run_server


def start_ui():
    while True:
        ...


def start_api():
    server = run_server(settings.app_server_host, settings.app_server_port)
    with server.run_in_thread():
        start_ui()


if __name__ == '__main__':
    start_api()
