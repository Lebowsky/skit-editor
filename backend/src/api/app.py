import contextlib
import threading
import time

import uvicorn
from fastapi import FastAPI, WebSocket, Request

app = FastAPI()
server = ...


class Server(uvicorn.Server):
    @contextlib.contextmanager
    def run_in_thread(self):
        thread = threading.Thread(target=self.run)
        thread.start()
        try:
            while not self.started:
                time.sleep(1e-3)
            yield
        finally:
            self.should_exit = True
            thread.join()


def run_server(settings):
    return Server(
        uvicorn.Config(
            app=app,
            host=settings.app_server_host,
            port=settings.app_server_port,
            reload=True
        )
    )

