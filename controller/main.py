import socket
import threading
import time
from nicegui import ui, app
from typing import Callable, Optional

class UDPClient:
    def __init__(self, host='127.0.0.1', port=20001):
        self.host = host
        self.port = port
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.callback = None
        self.running = False
        self.thread = None

    def start(self):
        try:
            self.socket.bind(('', self.port))
            self.running = True
            self.thread = threading.Thread(target=self._receive_loop)
            self.thread.daemon = True
            self.thread.start()
            return True
        except Exception as e:
            print(f"Failed to start UDP client: {e}")
            return False

    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join()
        self.socket.close()

    def _receive_loop(self):
        while self.running:
            try:
                data, addr = self.socket.recvfrom(1024)
                if self.callback:
                    hex_str = ' '.join([f'{b:02x}' for b in data])
                    self.callback(hex_str)
            except:
                continue

    def send_message(self, id: int, type: int, cmd1: bytes, cmd2: bytes, msg_type: int):
        try:
            message = bytearray([id, type, msg_type])
            message.extend(cmd1)
            message.extend(cmd2)
            self.socket.sendto(message, (self.host, self.port))
        except Exception as e:
            print(f"Failed to send message: {e}")

    def register_callback(self, callback: Callable):
        self.callback = callback

    def unregister_callback(self):
        self.callback = None

def main():
    client = UDPClient()
    client.start()

    app.on_shutdown(client.stop)
    ui.colors(primary='#6200ee')

    with ui.tabs().classes('w-full') as tabs:
        controls = ui.tab('Controls')
        teaching = ui.tab('Teaching')

    with ui.tab_panels(tabs, value=controls).classes('w-full'):
        with ui.tab_panel(controls):
            controls(client)
        with ui.tab_panel(teaching):
            ui.label('Teaching mode')

    ui.run(port=8080, reload=False)

if __name__ == '__main__':
    main()