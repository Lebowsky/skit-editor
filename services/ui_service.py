from pathlib import Path

import services.dialogs
from models.api_responces import ProjectPathsData
from models.file_types import FileType
from services.dialogs import ask_file, ask_dir


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


if __name__ == '__main__':
    print(get_project_paths_data())
