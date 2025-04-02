# Testing YOLO with laptop camera for object detection and distance estimation
# Download YOLO Model Files: You need the YOLO configuration file (yolov3.cfg), the pre-trained weights file (yolov3.weights), and the COCO names file (coco.names). You can download them from the following links:
# yolov3.cfg
# yolov3.weights
# coco.names
# Save the Files: Save these files in a directory on your computer. For example, you can create a directory named models inside your project directory and save the files there.

import cv2
import numpy as np
import os
from cv2 import aruco

# Define the absolute path to the models directory
models_dir = "/Users/pgherghe/Documents/SE 4450/Repo/SE4450_Team21_ArmApplication/YOLO/models"

# Load YOLO
net = cv2.dnn.readNet(os.path.join(models_dir, "yolov3.weights"), os.path.join(models_dir, "yolov3.cfg"))
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

# Load COCO labels
with open(os.path.join(models_dir, "coco.names"), "r") as f:
    classes = [line.strip() for line in f.readlines()]

# Initialize the camera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video device")
    exit()

# Known width of the object in real life (e.g., 20 cm)
KNOWN_WIDTH = 20.0

# Focal length of the camera (this needs to be calibrated for your specific camera)
FOCAL_LENGTH = 700.0

# Calibration factor for fine-tuning the distance estimation
CALIBRATION_FACTOR = 1.0

def calculate_distance(knownWidth, focalLength, perWidth, calibrationFactor):
    # Compute and return the distance from the object to the camera
    return (knownWidth * focalLength * calibrationFactor) / perWidth

# Define the ArUco dictionary and parameters
aruco_dict = aruco.getPredefinedDictionary(aruco.DICT_6X6_250)
parameters = aruco.DetectorParameters()

# Frame skipping parameter
FRAME_SKIP = 2
frame_count = 0

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    
    if not ret:
        print("Error: Could not read frame")
        break
    
    frame_count += 1
    if frame_count % FRAME_SKIP != 0:
        continue
    
    # Resize the frame to reduce processing time
    frame = cv2.resize(frame, (1920, 1080))
    
    height, width, channels = frame.shape

    # Prepare the frame for object detection
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    # Initialize lists for detected bounding boxes, confidences, and class IDs
    boxes = []
    confidences = []
    class_ids = []

    # Loop over each detection
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            
            # Filter out weak detections
            if confidence > 0.5:
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                
                # Calculate the coordinates of the bounding box
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    # Apply non-maxima suppression to remove overlapping bounding boxes
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    # Draw bounding boxes and labels on the frame
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = str(classes[class_ids[i]])
            confidence = confidences[i]
            distance = calculate_distance(KNOWN_WIDTH, FOCAL_LENGTH, w, CALIBRATION_FACTOR)
            color = (0, 255, 0)
            cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
            cv2.putText(frame, f"{label} {confidence:.2f} Distance: {distance:.2f} cm", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    # Detect ArUco markers in the frame
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    corners, ids, rejected = aruco.detectMarkers(gray, aruco_dict, parameters=parameters)

    # If markers are detected
    if ids is not None:
        for i in range(len(ids)):
            # Draw the bounding box and ID of the marker
            aruco.drawDetectedMarkers(frame, corners, ids)
            c = corners[i][0]
            x, y, w, h = cv2.boundingRect(c)
            marker_id = ids[i][0]
            cv2.putText(frame, f"Marker ID: {marker_id}", (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    # Display the resulting frame
    cv2.imshow('Frame', frame)
    
    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()