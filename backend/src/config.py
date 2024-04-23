from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    path_to_config: str
    app_server_host: str
    app_server_port: int

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'


settings = Settings()
