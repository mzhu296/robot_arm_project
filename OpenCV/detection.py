#Import cv2 and numpy for image recognition models
import cv2
import numpy as np

# Load prototxt and caffemodel files to use OpenCV libraries
prototxt_path = r"C:\SE4450\ArmApplication\SE4450_Team21_ArmApplication\OpenCV\deploy.prototxt"
caffemodel_path = r"C:\SE4450\ArmApplication\SE4450_Team21_ArmApplication\OpenCV\mobilenet_iter_73000.caffemodel"
net = cv2.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)

# List of detectable objects, used as a classes
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow",
           "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]

#  webcam start up
cap = cv2.VideoCapture(0)

# Loop for reading the camera frame
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convert frame to blob to analyze
    blob = cv2.dnn.blobFromImage(frame, 0.007843, (300, 300), 127.5)
    net.setInput(blob)
    detections = net.forward()
    
    # Loop through detections 
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.2:  # Confidence threshold
            idx = int(detections[0, 0, i, 1])
            box = detections[0, 0, i, 3:7] * np.array([frame.shape[1], frame.shape[0], frame.shape[1], frame.shape[0]])
            (startX, startY, endX, endY) = box.astype("int")
            
            # Draw the image container and recognize the image
            label = f"{CLASSES[idx]}: {confidence * 100:.2f}%"
            cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
            cv2.putText(frame, label, (startX, startY - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Display the frame with the decided class
    cv2.imshow("Frame", frame)
    
    # Use the 'q' key to shut the frame down
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the resources and destroy the cv2 window
cap.release()
cv2.destroyAllWindows()
