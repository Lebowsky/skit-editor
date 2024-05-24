import platform

from tkinter import Tk
from tkinter.filedialog import askopenfilename, asksaveasfilename, askdirectory

from models.file_types import FileType


def ask_file(file_type: FileType) -> str:
    """ Ask the user to select a file """
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)

    match file_type:
        case 'simple_ui':
            file_types = [('Simple UI files', '*.ui')]
        case 'python':
            file_types = [('Python files', '*.py')]
        case 'json':
            file_types = [('Json files', '*.json')]
        case _:
            file_types = ('All files', '*')

    if (file_type is None) or (platform.system() == "Darwin"):
        file_path = askopenfilename(parent=root)
    else:
        file_path = askopenfilename(parent=root, filetypes=file_types)
    root.update()

    return file_path


def ask_save_file(file_type='simple_ui'):
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    if file_type == 'simple_ui':
        file_types = [('Simple UI files', '*.ui')]
    else:
        file_types = [('All files', '*')]
    file_path: str = asksaveasfilename(parent=root, filetypes=file_types)
    root.update()

    return file_path


def ask_dir() -> str:
    root = Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)

    return askdirectory()
