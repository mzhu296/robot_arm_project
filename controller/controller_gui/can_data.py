import struct
import threading

can_lock = threading.Lock()

Message_type = {
    "short": 0,
    "full": 1,
}

command_id = {
    "Get_Version": 0,
    "Heartbeat": 1,
    "Set_Axis_State": 7,
    "Get_Encoder_Estimates": 9,
    "Set_Controller_Mode": 11,#0x0b
    "Set_Input_Pos": 12, #0x0c
    "Set_Input_Vel": 13, #0x0d
    "Get_Iq": 20,#0x14
    "Get_Temperature": 21, #0x15
    "Reboot": 22, #0x16
    "Get_Bus_Voltage_Current": 23,#0x17
    "Set_Linear_Count": 25,#0x19
}

ControlMode = {
    "VOLTAGE_CONTROL": 0,
    "TORQUE_CONTROL": 1,
    "VELOCITY_CONTROL": 2,
    "POSITION_CONTROL": 3,
}

InputMode = {
    "INACTIVE": 0,
    "PASSTHROUGH": 1,
    "VEL_RAMP": 2,
    "POS_FILTER": 3,
    "MIX_CHANNELS": 4,
    "TRAP_TRAJ": 5,
    "TORQUE_RAMP": 6,
    "MIRROR": 7,
    "TUNING": 8,
}

AxisState = {
    "IDLE": 1,
    "CLOSED_LOOP_CONTROL": 8, 
}

Reboot = {
    "Reboot": 0,
    "Save_configs": 1, 
    "Erase_configs": 2, 
    "Enter_dfu": 3, 
}

can_message = {
    "header": b'\xaa',
    "id": b'\x00',
    "type": b'\x00',
    "body": bytes([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]),
    "tail": b'\x88',
}

joint_angles = [
    {'J1': 0.0, 'J2': 0.0, 'J3': 0.0, 'J4': 0.0, 'J5': 0.0, 'J6': 0.0, 'Delay': 1.5, 'Gripper': 0, 'Torque': 0.0},
]

def pack_can_message(bytes_array):
    format_string = "<BBB8sB"  # "<" for little-endian byte order, "B" for unsigned char (1 byte)
    # Pack bytes_array into struct
    packed_data = struct.pack(format_string, bytes_array[0], bytes_array[1], bytes_array[2], bytes_array[3:11], bytes_array[11])
    unpacked_data = struct.unpack(format_string, packed_data)
    with can_lock:
        can_message.update(header = unpacked_data[0])
        can_message.update(id = unpacked_data[1])
        can_message.update(type = unpacked_data[2])
        can_message.update(body = unpacked_data[3])
        can_message.update(tail = unpacked_data[4])
    return can_message
    # print(can_message)
    
