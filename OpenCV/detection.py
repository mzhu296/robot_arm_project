#Look to the README.md file in the same folder for thoughts on this model
# Import OpenCV and NumPy
import cv2
import numpy as np

# Load model files (deploy.prototxt and mobilenet.caffemodel)
prototxt_path = r"C:\SE4450\ArmApplication\SE4450_Team21_ArmApplication\OpenCV\deploy.prototxt"
caffemodel_path = r"C:\SE4450\ArmApplication\SE4450_Team21_ArmApplication\OpenCV\mobilenet_iter_73000.caffemodel"
net = cv2.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)

# List of detectable objects
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow",
           "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]

# Constants for distance estimation
KNOWN_HEIGHTS = {
    "person": 170,  # cm
    "bottle": 25,   # cm
    "tvmonitor": 50, # cm
}  # Add more if needed
FOCAL_LENGTH = 500  # Adjust after calibration

# Start webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Convert frame to blob for neural network processing
    blob = cv2.dnn.blobFromImage(frame, 0.007843, (300, 300), 127.5)
    net.setInput(blob)
    detections = net.forward()
    
    # Loop through detected objects
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.2:  # Confidence threshold
            idx = int(detections[0, 0, i, 1])
            class_name = CLASSES[idx]
            
            box = detections[0, 0, i, 3:7] * np.array([frame.shape[1], frame.shape[0], frame.shape[1], frame.shape[0]])
            (startX, startY, endX, endY) = box.astype("int")
            
            # Calculate bounding box height
            height_pixels = endY - startY
            
            # Estimate distance if object height is known
            distance = "Unknown"
            if class_name in KNOWN_HEIGHTS and height_pixels > 0:
                real_height = KNOWN_HEIGHTS[class_name]
                distance = (real_height * FOCAL_LENGTH) / height_pixels
                distance = f"{distance:.2f} cm"
            
            # Draw bounding box and labels
            label = f"{class_name}: {confidence * 100:.2f}% | {distance}"
            cv2.rectangle(frame, (startX, startY), (endX, endY), (0, 255, 0), 2)
            cv2.putText(frame, label, (startX, startY - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    
    # Display the frame
    cv2.imshow("Object Detection with Distance Estimation", frame)
    
    # Exit with 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release resources
cap.release()
cv2.destroyAllWindows()
