import uuid

from pydantic import BaseModel, Field


class BaseConfigModel(BaseModel):
    class Config:
        populate_by_name = True
        use_enum_values = True


class OperationsModel(BaseConfigModel):
    type: str = 'Operation'
    name: str = Field(default='New screen', alias='Name')
    hide_toolbar_screen: bool = Field(default=False, alias='hideToolBarScreen',
                                      title='Hide top bar')
    hide_bottom_bar_screen: bool = Field(default=False, alias='hideBottomBarScreen',
                                         title='Hide button bar')
    no_scroll: bool = Field(default=False, alias='noScroll',
                            title='Disable scrolling for Root Layout')
    no_confirmation: bool = Field(default=False, alias='noConfirmation',
                                  title='Close without confirmation')
    elements: list = Field(default=[], alias='Elements')
    handlers: list = Field(default=[], alias='Handlers')


class ProcessesModel(BaseConfigModel):
    type: str = 'Process'
    process_name: str = Field(default='New process', alias='ProcessName', title='Process name')
    define_on_back_pressed: bool = Field(
        default=False,
        alias='DefineOnBackPressed',
        title='Override back button (ON_BACK_PRESSED input event)'
    )
    hidden: bool = Field(default=False, title='Do not display in Menu')
    login_screen: bool = Field(default=False, title='Run at startup')
    operations: list[OperationsModel] = Field(alias='Operations')

    class Config:
        title = 'Process'


class ConfigurationSettingsModel(BaseConfigModel):
    uid: str = uuid.uuid4().hex
    vendor: str = ''
    vendor_url: str = ''
    vendor_auth: str = ''
    handler_split_mode: bool = False
    handler_code: str = ''
    handler_url: str = ''
    handler_auth: str = ''
    dictionaries: str = ''

    class Config:
        title = 'ConfigurationSettings'


class ClientConfigurationModel(BaseConfigModel):
    name: str = Field(default='New configuration', alias='ConfigurationName')
    description: str | None = Field(default='', alias='ConfigurationDescription')
    version: str = Field(default='0.0.1', alias='ConfigurationVersion')
    processes: list = Field(
        default=[ProcessesModel(Operations=[OperationsModel()])],
        alias='Processes')
    settings: ConfigurationSettingsModel = Field(
        default=ConfigurationSettingsModel(),
        alias='ConfigurationSettings')

    tags: str = Field(default='', alias='ConfigurationTags')
    run_python: bool = Field(default=True, alias='RunPython')
    main_menu: list = Field(default=[], alias='MainMenu')
    media_file: list = Field(default=[], alias='Mediafile')
    py_handlers: str = Field(default='', alias='PyHandlers')
    py_files: list = Field(default=[], alias='PyFiles')
    arch2: bool = True
    common_handlers: list = Field(default=[], alias='CommonHandlers')

    class Config:
        title = 'ClientConfiguration'


class RootConfigModel(BaseConfigModel):
    client_configuration: ClientConfigurationModel = Field(
        default=ClientConfigurationModel(),
        alias='ClientConfiguration'
    )
