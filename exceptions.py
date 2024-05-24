import json


class InitUiConfigError(Exception):
    def json(self):
        return json.loads(str(self))


class VersionError(Exception):
    pass


class CheckUiConfigError(Exception):
    pass
