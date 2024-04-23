import json

from exceptions import SaveConfigurationFileError


class ConfigurationSerivce:
    def __init__(self, file_path):
        self.encoding = 'utf-8'

    def load_configuration(self, file_path) -> dict:
        with open(file_path, encoding=self.encoding) as fp:
            return json.load(fp)

    def save_configuration(self, file_path, data: dict) -> None:
        with open(file_path, mode='w', encoding=self.encoding) as fp:
            json.dump(data, fp, ensure_ascii=False)
