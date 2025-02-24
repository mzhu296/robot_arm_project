import openai
import can_data
import struct
import re
import speech_recognition as sr  # 🗣️ Add speech recognition

# Set up the DeepSeek AI client with LM Studio
client = openai.OpenAI(
    api_key="EMPTY",  # No API key needed for LM Studio
    base_url="http://localhost:1234/v1"  # Ensure LM Studio is running
)

# Function to generate a response from AI
def generate_response(prompt):
    response = client.chat.completions.create(
        model="deepseek-r1",
        messages=[
            {"role": "system", "content": "You are a robotic control AI assistant. "
             "Always respond with six numerical joint values, separated by commas, including negative values where appropriate. "
             "Example: '-14, 25, -45, 0, 3, -25'."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=200
    )
    return response.choices[0].message.content

import re

def process_ai_command(udp_client, command_text):
    ai_response = generate_response(command_text)
    print(f"🔹 AI Response: {ai_response}")  # Debugging output

    # ✅ Use regex to extract negative & positive numbers
    joint_values = re.findall(r'-?\d+\.\d+|-?\d+', ai_response)  
    joint_values = [float(x) for x in joint_values][:6]  # ✅ Ensure exactly 6 values

    print(f"🔹 Extracted joint values: {joint_values}")  # Debugging output

    if len(joint_values) == 6:
        send_joint_positions(udp_client, joint_values)
        return f"✅ Sent command to move joints: {joint_values}"
    else:
        return f"⚠️ Error: AI response did not contain 6 valid joint positions. Extracted: {joint_values}"
    
# Function to send joint positions via UDP
def send_joint_positions(udp_client, joint_angles):
    for i, angle in enumerate(joint_angles):
        cid = i + 1  # Motor ID (J1 = 1, J2 = 2, ...)
        reduction_value = 50  # Adjust based on your robot's motor settings
        motor_cnt = angle / 360.0 * reduction_value
        pos = struct.pack('<f', float(motor_cnt))
        cmd2 = struct.pack('<HH', 60, 10)

        udp_client.send_message(
            cid,
            can_data.command_id['Set_Input_Pos'],
            pos,
            cmd2,
            can_data.Message_type['short']
        )