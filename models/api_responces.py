from pydantic import BaseModel


class ErrorResponce(BaseModel):
    type: str
    title: str
    detail: str


class PathData(BaseModel):
    path: str


class DataResponceCommon(BaseModel):
    data: dict | None = None
    error: ErrorResponce | None = None


class ProjectPathsData(BaseModel):
    ui_path: str | None = None
    working_dir_path: str | None = None
    project_config_path: str | None = None


class FileOpenResponse(DataResponceCommon):
    data: ProjectPathsData
