from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from controllers import *
from utils.utils import *
import sys
import os
import logging
import pythoncom
import multiprocessing

pythoncom.CoInitialize()
# Create and configure logger
logging.basicConfig(format='%(asctime)s - %(message)s',
                    datefmt='%d-%b-%y %H:%M:%S')

os.environ["QT_AUTO_SCREEN_SCALE_FACTOR"] = "1"
os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--no-sandbox"


baseDir = os.path.dirname(__file__)

try:
    from ctypes import windll
    myappid = 'mycompany.myproduct.subproduct.version'
    windll.shell32.SetCurrentProcessExplicitAppUserModelID(myappid)
except ImportError:
    pass


def write_file(css):
    with open(os.path.join(baseDir, 'ayoub.css'), 'w') as file:
        file.write(css)


def main():
    multiprocessing.freeze_support()
    QApplication.setAttribute(Qt.AA_EnableHighDpiScaling, True)
    QApplication.setAttribute(Qt.AA_UseHighDpiPixmaps, True)
    app = QApplication(sys.argv)
    font_id = QFontDatabase.addApplicationFont(os.path.join(
        baseDir, 'assets', 'fonts', 'DMSans-Regular.ttf'))
    font_family = QFontDatabase.applicationFontFamilies(font_id)[0]
    app.setFont(QFont(font_family))
    myApp = MyApp()
    # write_file(app.styleSheet())
    myApp.show()
    sys.exit(app.exec_())


if __name__ == '__main__':
    main()
