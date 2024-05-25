from pathlib import Path
import json
import logging

from exceptions import VersionError, InitUiConfigError

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


class UiConfigManager:
    def __init__(self, file_path):
        self.file_path = str(Path(file_path))
        self.config_data: dict = {}
        self.error = {}
        self.unsupported_version = False

    def init_config(self):
        self._read_config()
        self._check_config()
        if self.error:
            logger.error(f'Init config error as cause: {self.error}')
            raise InitUiConfigError(
                json.dumps(dict(**{'file_path': self.file_path}, **self.error))
            )

    def get_config_data(self, convert_version=False):
        if convert_version and self._is_unsupported_version_config():
            self._convert_config_version()
        return self.config_data

    def set_config_data(self, config_data: dict):
        self.config_data = config_data

    def save_configuration(self, config_data: dict):
        self.set_config_data(config_data)
        if self.save_config_to_file():
            return {'result': 'success'}
        else:
            return {
                'result': 'error',
                'msg': json.dumps(self.error)
            }

    def save_config_to_file(self):
        result = False
        try:
            config = self.config_data
            with open(self.file_path, 'w', encoding="utf-8") as f:
                json.dump(
                    config,
                    f,
                    ensure_ascii=False,
                    indent=4,
                    separators=(',', ': ')
                )
            result = True
        except FileExistsError as e:
            self.error = {'error': 'FileExistsError', 'message': self.file_path}
        except json.JSONDecodeError as e:
            self.error = {'error': 'JSONDecodeError', 'message': str(e)}
        except Exception as e:
            self.error = {'error': 'UnknownError', 'message': str(e)}

        return result

    def _read_config(self):
        result = False
        try:
            with open(self.file_path, encoding='utf-8') as f:
                self.config_data = json.load(f)
                result = True
        except json.JSONDecodeError as e:
            self.error = {'error': 'JSONDecodeError', 'message': str(e)}
        except FileNotFoundError as e:
            self.error = {'error': 'FileNotFoundError', 'message': self.file_path}
        except Exception as e:
            self.error = {'error': 'UnknownError', 'message': str(e)}

        return result

    def _check_config(self):
        result = False
        try:
            result = self._check_config_version()
        except ValueError as e:
            self.error = {'error': 'ValueError', 'message': str(e)}
        except VersionError as e:
            self.error = {'error': 'VersionError', 'message': str(e)}
        except Exception as e:
            self.error = {'error': 'UnknownError', 'message': str(e)}

        return result

    def _check_config_version(self):
        if self._is_unsupported_version_config():
            self.unsupported_version = True
            raise VersionError('Unsupported configuration version')
        return True

    def _is_unsupported_version_config(self):
        for item in ['DefServiceConfiguration', 'OnlineServiceConfiguration']:
            if item in self.config_data.keys() and self.config_data[item]:
                return True

        check_keys = ['DefOnCreate', 'DefOnInput', 'DefOnlineOnCreate', 'DefOnlineOnInput']

        for process in self.config_data['ClientConfiguration']['Processes']:
            if not process.get('Operations'):
                continue
            for operation in process['Operations']:
                for item in check_keys:
                    if item in operation.keys() and operation[item]:
                        return True

    def _convert_config_version(self):
        check_keys = {
            'DefOnCreate': {'event': 'onStart', 'action': 'run', 'type': 'python'},
            'DefOnInput': {'event': 'onInput', 'action': 'run', 'type': 'python'},
            'DefOnlineOnCreate': {'event': 'onStart', 'action': 'run', 'type': 'online'},
            'DefOnlineOnInput': {'event': 'onInput', 'action': 'run', 'type': 'online'}
        }

        for process in self.config_data['ClientConfiguration']['Processes']:
            if not process.get('Operations'):
                continue

            for operation in process['Operations']:
                handlers = operation.get('Handlers', [])
                for item in check_keys:
                    if item in operation.keys() and operation[item]:
                        handlers.append({
                            'method': operation[item],
                            **check_keys[item]
                        })
                operation['Handlers'] = handlers
