from PyQt5.QtCore import *
from PyQt5.QtGui import *
from PyQt5.QtWidgets import *
from views import *
from models import *
from utils.utils import *
import time
from . alertDialogController import Alerts, AlertType, IconType, AlertButton
import os
import segno
from io import BytesIO
import socket
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import json
import uvicorn
import random
import string
from pydantic import BaseModel

security = HTTPBearer()


class ControlRequest(BaseModel):
    command: PowerPointCommand
    slide_number: int = None


class MyApp(QMainWindow):

    def __init__(self):
        QMainWindow.__init__(self)

        self.ui = Ui_Slidify()
        self.ui.setupUi(self)
        self.app = QApplication.instance()
        self.server_worker = None
        self.port = 8000
        self.token = ''.join(random.choices(
            string.ascii_uppercase + string.ascii_lowercase + string.digits, k=10))
        self.powerpoint = PowerPoint()
        baseDir = os.path.dirname(__file__)
        self.setWindowIcon(
            QIcon(os.path.join(baseDir, '..', 'assets', 'images', 'logo.png')))
        self.extra = {
            # Button colors
            'danger':  '#dc3545',
            'warning': '#ffc107',
            'success': '#1ff29a',
            # Font
            'font_family': 'DM Sans',
        }
        css_utils.load_stylesheet(
            self.app, theme='dark_blue.xml', extra=self.extra)
        self.ui.spinner_loading_page = WaitingSpinner(
            self.ui.widget_9,
            roundness=100.0,
            fade=63.49,
            radius=34,
            lines=75,
            line_length=30,
            line_width=23,
            speed=0.61,
            color=helpers.get_color(QtMaterialEnv.PRIMARYCOLOR)
        )
        self.toggle_loading_spinner()
        self.ui.stackedWidget.setCurrentWidget(self.ui.loading_page)
        self.setEvents()
        self._init_fastapi()
        self.server_worker = Worker(self._run_server)
        self.toggle_server_state()
        self.server_worker.start()
        self.init_qrcode()
        print(self.token)

    def verify_token(self, credentials: HTTPAuthorizationCredentials = Depends(security)):
        if credentials.credentials != self.token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return True

    def _run_server(self, fn_callback):
        self.config = uvicorn.Config(
            app=self.server_app, host='0.0.0.0', port=self.port, log_level=None, access_log=False, log_config=None)
        self.server = uvicorn.Server(config=self.config)
        self.server.run()

    def _stop_server(self):
        if self.server is not None:
            self.server.should_exit = True
            self.toggle_server_state()
            self.server_worker.wait()

    def _init_fastapi(self):
        self.is_server_running = False
        self.server_app = FastAPI()

        @self.server_app.get("/")
        async def index():
            return {"message": "A00N"}

        @self.server_app.get("/get_infos")
        async def get_infos():
            res: dict = self.powerpoint.get_infos()
            if res.get('error'):
                raise HTTPException(status_code=400, detail=res.get('error'))
            else:
                return res

        @self.server_app.post('/control')
        async def handle_control(
            request: ControlRequest,
            verified: bool = Depends(self.verify_token)
        ):
            command = request.command
            if command not in PowerPointCommand:
                raise HTTPException(status_code=400, detail='Invalid command')
            if command == PowerPointCommand.NEXT:
                res = self.powerpoint.next_slide()
            elif command == PowerPointCommand.PREVIOUS:
                res = self.powerpoint.prev_slide()
            elif command == PowerPointCommand.LAST:
                res = self.powerpoint.goto_last_slide()
            elif command == PowerPointCommand.START:
                res = self.powerpoint.start_slide_show()
            elif command == PowerPointCommand.EXIT:
                res = self.powerpoint.exit_slide_show()
            elif command == PowerPointCommand.GOTO:
                slide_number = request.slide_number
                if slide_number is None:
                    raise HTTPException(
                        status_code=400, detail='Slide number is required')
                res = self.powerpoint.goto_slide(slide_number)
            elif command == PowerPointCommand.FIRST:
                res = self.powerpoint.goto_first_slide()
            if res.get('error'):
                raise HTTPException(
                    status_code=400, detail=res.get('error'))
            else:
                return res

    def toggle_server_state(self):
        self.is_server_running = not self.is_server_running

    def init_qrcode(self):
        pixmap = QPixmap()
        pixmap.loadFromData(self.generate_qr_code().getvalue())
        self.ui.qrcode.setPixmap(pixmap)
        self.ui.qrcode.resize(pixmap.width(), pixmap.height())
        self.ui.label_4.setText(f'http://0.0.0.0:{self.port}')
        self.ui.stackedWidget.setCurrentWidget(self.ui.main_page)

    def setEvents(self):
        self.ui.refreshBtn.clicked.connect(self.refresh_callback)

    def refresh_callback(self):
        print('hello')

    def toggle_loading_spinner(self):
        if self.ui.spinner_loading_page.is_spinning:
            self.ui.spinner_loading_page.stop()
        else:
            self.ui.spinner_loading_page.start()

    def get_url(self) -> str:
        ip_address = socket.gethostbyname(socket.gethostname())
        url = f"http://{ip_address}:{self.port}"
        return url

    def generate_qr_code(self) -> BytesIO:
        json_data = json.dumps({
            'url': self.get_url(),
            'token': self.token
        })
        qr_code = segno.make(json_data)
        qr_code_buffer = BytesIO()
        qr_code.save(qr_code_buffer, kind='png',
                     dark=helpers.get_color(QtMaterialEnv.PRIMARYCOLOR), light=None, scale=10)
        qr_code_buffer.seek(0)
        return qr_code_buffer

    def closeEvent(self, event):
        self._stop_server()
        event.accept()
