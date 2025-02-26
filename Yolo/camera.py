from ultralytics import YOLO
import cv2

# Load YOLOv5 model
model = YOLO("C:/yoloFiles/yolov5s.pt")  # Make sure the path to the model is correct

# Start webcam feed
cam_feed = cv2.VideoCapture(0)
cam_feed.set(cv2.CAP_PROP_FRAME_WIDTH, 650)
cam_feed.set(cv2.CAP_PROP_FRAME_HEIGHT, 750)

while True:
    ret, frame = cam_feed.read()
    if not ret:
        break  # Exit loop if there's an issue with the webcam feed

    # Perform object detection
    results = model(frame)  # Run YOLOv5 on the frame

    # Draw bounding boxes
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

    # Exit condition (Press 'q' or 'Esc')
    key = cv2.waitKey(1)
    if key == ord("q") or key == 27:
        break

# Release resources
cam_feed.release()
cv2.destroyAllWindows()
