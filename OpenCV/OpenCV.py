# Testing OpenCV with laptop camera for face detection and distance estimation
#TODO Improve the accuracy of the distance estimation by calibrating the focal length of the camera
#TODO Implement a more accurate method for detecting the objects width in the frame
#TODO Calibrate percent error for the recognition estimation
#TODO Add percent confidence to the label

import cv2
import numpy as np

# Load the Haar cascade for face detection
face_cascade = cv2.CascadeClassifier('/Users/pgherghe/Documents/SE 4450/Repo/SE4450_Team21_ArmApplication/OpenCV/haarcascade_frontalface_default.xml')

# Load the pre-trained deep learning face detector model
net = cv2.dnn.readNetFromCaffe('/Users/pgherghe/Documents/SE 4450/Repo/SE4450_Team21_ArmApplication/OpenCV/deploy.prototxt', '/Users/pgherghe/Documents/SE 4450/Repo/SE4450_Team21_ArmApplication/OpenCV/mobilenet_iter_73000.caffemodel')

# Initialize the camera
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open video device")
    exit()

# Known width of the face in real life (e.g., 16 cm)
KNOWN_WIDTH = 16.0

# Focal length of the camera (this needs to be calibrated for your specific camera)
FOCAL_LENGTH = 700.0

# Confidence threshold for filtering detections
CONFIDENCE_THRESHOLD = 0.0

def calculate_distance(knownWidth, focalLength, perWidth):
    # Compute and return the distance from the object to the camera
    return (knownWidth * focalLength) / perWidth

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    
    if not ret:
        print("Error: Could not read frame")
        break
    
    # # Prepare the frame for face detection
    # (h, w) = frame.shape[:2]
    # blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))
    # net.setInput(blob)
    # detections = net.forward()
    
    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    # Draw objects boundaries
    for cnt in contours:
        # Get rect
        rect = cv2.minAreaRect(cnt)
        (x, y), (w, h), angle = rect
        # Display rectangle
        box = cv2.boxPoints(rect)
        box = np.int0(box)
        cv2.circle(img, (int(x), int(y)), 5, (0, 0, 255), -1)
        cv2.polylines(img, [box], True, (255, 0, 0), 2)
        
    # Loop over the detected faces
    for (x, y, w, h) in faces:
        # Calculate the distance to the face
        distance = calculate_distance(KNOWN_WIDTH, FOCAL_LENGTH, w)
        
        # Assume a default confidence for Haar cascade detections
        confidence = 1.0
        
        # Draw the bounding box and label on the frame
        label = f"Face: {confidence * 100:.2f}% Distance: {distance:.2f} cm"
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Display the resulting frame
    cv2.imshow('Frame', frame)
    
    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()