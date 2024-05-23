from pydantic import BaseModel


class ErrorResponce(BaseModel):
    type: str
    title: str
    detail: str


class DataResponce(BaseModel):
    data: dict | None = None
    error: ErrorResponce | None = None


class ProjectPathsData(BaseModel):
    ui_path: str
    working_dir_path: str
    project_config_path: str


class UIFileOpenResponse(DataResponce):
    data: ProjectPathsData | None = None
