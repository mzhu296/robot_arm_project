# # Usage
import socket
from collections import deque
import threading
import time
import can_data
import zlib

client = UDPClient('192.168.0.88', 9999)

if client.connect():
    print('Connected to the server.')
    client.send_message("disable")
    client.start_receive_thread()  # Start receiving messages in a separate thread

    # Get data from the buffer one by one
    while True:
        data = client.get_buffer_data()
        if data is None:
            # print('Buffer is empty.')
            time.sleep(0.01)
            continue
            # break
        else:
            print(f'Buffer data: {data}')

else:
    print('Failed to connect to the server.')

client.close()
