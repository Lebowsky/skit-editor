import contextlib
import json
import threading
import time

import uvicorn
from fastapi import FastAPI, Request, Depends, HTTPException, status

from services.configuration_service import ConfigurationSerivce
from exceptions import SaveConfigurationFileError

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


def run_server(app_server_host, app_server_port):
    return Server(
        uvicorn.Config(
            app=app,
            host=app_server_host,
            port=app_server_port,
            reload=True
        )
    )


@app.get('/get_conf')
async def get_config(file_path: str, service: ConfigurationSerivce = Depends()):
    configuration = service.load_configuration(file_path)
    return configuration


@app.post('/set_conf')
async def save_config(file_path: str, request: Request, service: ConfigurationSerivce = Depends()):
    data = await request.json()
    service.save_configuration(file_path, data)
    return {'result': True}
