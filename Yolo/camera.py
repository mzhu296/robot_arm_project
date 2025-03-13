#Imports
from ultralytics import YOLO  # Import YOLO
import cv2  # Import OpenCV for image processing

# Load the YOLO model
model = YOLO("C:/yoloFiles/yolov5s.pt")  

# Set up the camera, feed, width and height
cam_feed = cv2.VideoCapture(0)
cam_feed.set(cv2.CAP_PROP_FRAME_WIDTH, 650)
cam_feed.set(cv2.CAP_PROP_FRAME_HEIGHT, 750)

# Constants for distance estimation
KNOWN_HEIGHT = 170  # the avergae human height
FOCAL_LENGTH = 500  # This current placeholder for focal length

# Read camera feed loop
while True:
    ret, frame = cam_feed.read()
    if not ret:
        break  # Exit loop if there's an issue

    # Object detection
    results = model(frame)  

    # Draw bounding boxes and find distance away from camera
    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates
            height_pixels = y2 - y1  # Object height in pixels
            confidence = box.conf[0].item() * 100  # Confidence score
            class_id = int(box.cls[0].item())  # Class ID
            label = f"{model.names[class_id]} {confidence:.2f}%"

            # Estimate distance 
            if height_pixels > 0:
                distance = (KNOWN_HEIGHT * FOCAL_LENGTH) / height_pixels
                label += f" {distance:.2f} cm"

            # Draw rectangle with label
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2) #Place text label on frame

    # Show the result
    cv2.imshow("YOLOv5 Object Detection with Distance Estimation", frame)

    # Exit on 'q' or 'esc'
    key = cv2.waitKey(1)
    if key == ord("q") or key == 27:
        break

# Release resources
cam_feed.release()
cv2.destroyAllWindows()
