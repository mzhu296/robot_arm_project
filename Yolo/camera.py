# Import ultraalytics (YOLO) and cv2 for image recognition
from ultralytics import YOLO
import cv2

# Load the YOLOv5 model
# Use path from C: folder
model = YOLO("C:/yoloFiles/yolov5s.pt")  

# Start the webcam feed
cam_feed = cv2.VideoCapture(0)
cam_feed.set(cv2.CAP_PROP_FRAME_WIDTH, 650)
cam_feed.set(cv2.CAP_PROP_FRAME_HEIGHT, 750)

while True:
    ret, frame = cam_feed.read()
    if not ret:
        break  # Exit loop in case of issue with the webcam feed

    # Begin object detection, use YOLOv5 on the frame
    results = model(frame)  
    # Draw the bounding boxes around the recognized objects
    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Get bounding box coordinates
            confidence = box.conf[0].item() * 100  # Get confidence score
            class_id = int(box.cls[0].item())  # Get class ID
            label = f"{model.names[class_id]} {confidence:.2f}%"

            # Draw rectangle and label
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Display the image with detected objects
    cv2.imshow("YOLOv5 Object Detection", frame)

    # Use 'q' or 'esc' to shut down the window
    key = cv2.waitKey(1)
    if key == ord("q") or key == 27:
        break

# Release resources
cam_feed.release()
cv2.destroyAllWindows()
