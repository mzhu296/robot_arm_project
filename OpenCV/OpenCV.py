# filepath: /Users/pgherghe/Documents/SE 4450/Repo/SE4450_Team21_ArmApplication/OpenCV/OpenCV.py
# Testing OpenCV with laptop camera for object detection and distance estimation

import cv2
import numpy as np

# Load a pre-trained object detection model (e.g., MobileNet SSD)
net = cv2.dnn.readNetFromCaffe('/Users/pgherghe/Documents/SE 4450/Repo/SE4450_Team21_ArmApplication/OpenCV/deploy.prototxt', '/Users/pgherghe/Documents/SE 4450/Repo/SE4450_Team21_ArmApplication/OpenCV/mobilenet_iter_73000.caffemodel')

# Initialize the camera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video device")
    exit()

# Known width of the object in real life (e.g., 20 cm)
KNOWN_WIDTH = 20.0

# Focal length of the camera (this needs to be calibrated for your specific camera)
FOCAL_LENGTH = 700.0

def calculate_distance(knownWidth, focalLength, perWidth):
    # Compute and return the distance from the object to the camera
    return (knownWidth * focalLength) / perWidth

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    
    if not ret:
        print("Error: Could not read frame")
        break
    
    # Prepare the frame for object detection
    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 0.007843, (300, 300), 127.5)
    net.setInput(blob)
    detections = net.forward()

    # Loop over the detections
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        
        # Filter out weak detections
        if confidence > 0.2:
            idx = int(detections[0, 0, i, 1])
            box = detections[0, 0, i, 3:7] * np.array([frame.shape[1], frame.shape[0], frame.shape[1], frame.shape[0]])
            (startX, startY, endX, endY) = box.astype("int")
            
            # Calculate the width of the detected object
            object_width = endX - startX
            
            # Estimate the distance to the object
            distance = calculate_distance(KNOWN_WIDTH, FOCAL_LENGTH, object_width)
            
            # Draw the bounding box and label on the frame
            label = f"Object: {confidence * 100:.2f}% Distance: {distance:.2f} cm"
            cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
            y = startY - 15 if startY - 15 > 15 else startY + 15
            cv2.putText(frame, label, (startX, y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Display the resulting frame
    cv2.imshow('Frame', frame)
    
    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()