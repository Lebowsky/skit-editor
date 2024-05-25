from pathlib import Path

from exceptions import InitUiConfigError
from models.api_responces import ProjectPathsData, DataResponceCommon, ErrorResponce, PathData
from models.file_types import FileType
from models.ui_config_models import RootConfigModel
from services import dialogs
from services.ui_config_service import UiConfigManager


def ask_dir() -> PathData | None:
    dir_path = dialogs.ask_dir()
    if dir_path:
        return PathData(path=dir_path)


def ask_save_file() -> PathData | None:
    file_path = dialogs.ask_save_file()
    if file_path:
        return PathData(path=file_path)


def save_file_content(path: str, content: dict):
    ui_config_manager = UiConfigManager(file_path=path)
    ui_config_manager.save_configuration(content)


def get_project_paths_data() -> ProjectPathsData:
    ui_path = dialogs.ask_file(FileType.simple_ui)
    if ui_path:
        return ProjectPathsData(
            ui_path=str(Path(ui_path).absolute()),
            working_dir_path=str(Path(ui_path).parent),
            project_config_path=str(Path(ui_path).parent / 'project_config.json')
        )


def get_working_dir_path() -> ProjectPathsData:
    path = dialogs.ask_dir()
    if path:
        return ProjectPathsData(working_dir_path=str(Path(path)))


def get_project_config_path() -> ProjectPathsData:
    path = dialogs.ask_file(FileType.json)
    if path:
        return ProjectPathsData(project_config_path=str(Path(path)))


def get_configuration_from_file(paths_data, convert_version=False) -> DataResponceCommon:
    error = None
    data = None

    try:
        paths = ProjectPathsData(**paths_data)
        if not paths.ui_path:
            raise InitUiConfigError('UI file path not specified')
        else:
            if convert_version is False:
                ui_config_manager = UiConfigManager(file_path=paths.ui_path)
                ui_config_manager.init_config()

                data = ui_config_manager.get_config_data(convert_version=convert_version)
    except ValueError:
        pass
    except InitUiConfigError as e:
        error = ErrorResponce(
            type=str(type(e)),
            title='Init UI config error',
            detail=str(e)
        )

    return DataResponceCommon(data=data, error=error)


def get_new_configuration() -> DataResponceCommon:
    return DataResponceCommon(
        data=RootConfigModel().dict(by_alias=True, exclude_none=True)
    )
