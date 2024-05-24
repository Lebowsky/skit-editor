from pathlib import Path

import services.dialogs
from exceptions import InitUiConfigError
from models.api_responces import ProjectPathsData, DataResponceCommon, ErrorResponce
from models.file_types import FileType
from services.dialogs import ask_file, ask_dir
from services.ui_config_service import UiConfigManager


def get_project_paths_data() -> ProjectPathsData:
    ui_path = ask_file(FileType.simple_ui)
    if ui_path:
        return ProjectPathsData(
            ui_path=str(Path(ui_path).absolute()),
            working_dir_path=str(Path(ui_path).parent),
            project_config_path=str(Path(ui_path).parent / 'project_config.json')
        )


def get_working_dir_path() -> ProjectPathsData:
    path = ask_dir()
    if path:
        return ProjectPathsData(working_dir_path=str(Path(path)))


def get_project_config_path() -> ProjectPathsData:
    path = ask_file(FileType.json)
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


if __name__ == '__main__':
    print(get_project_paths_data())
