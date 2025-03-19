import google.generativeai as genai
import os
import whisper
import sounddevice as sd
import numpy as np
import wave
from gtts import gTTS

# Configure Gemini API
genai.configure(api_key="AIzaSyDYijxn9-nxlQHSEgiO5htnVgWbei0Q9PU")
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize Whisper model
whisper_model = whisper.load_model("base")

def record_audio_file(filename="input.wav", duration=5, samplerate=44100, channels=1):
    print("Recording...")
    # Recording audio with specified duration, sample rate, and channels
    audio_data = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=channels, dtype=np.int16)
    sd.wait()
    print("Recording complete.")

    # Save as WAV
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(2)
        wf.setframerate(samplerate)
        wf.writeframes(audio_data.tobytes())
    
    print(f"Saved recording to {filename}")
    return filename

def record_audio_whisper(audio_file="input.wav"):
    print("Processing audio with Whisper...")
    result = whisper_model.transcribe(audio_file)
    text = result["text"]
    print(f"Transcribed Text: {text}")
    return text

def get_ai_response(text):
    response = model.generate_content(text)
    return response.text

def text_to_speech(text):
    tts = gTTS(text, lang="en")
    tts.save("response.mp3")
    os.system("afplay response.mp3")  # macOS: afplay | Windows: start | Linux: mpg321

if __name__ == "__main__":
    # Record and save the audio
    audio_file = record_audio_file(channels=1)  # Ensure mono if microphone supports it
    
    # Get transcription using Whisper
    user_input = record_audio_whisper(audio_file)
    
    if user_input:
        ai_response = get_ai_response(user_input)
        print(f"AI: {ai_response}")
        text_to_speech(ai_response)
