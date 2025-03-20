import cv2
from ultralytics import YOLO  # Import YOLO

# Load YOLO model
MODEL_PATH = "C:/yoloFiles/yolov5s.pt"
model = YOLO(MODEL_PATH)

# Initialize camera
cam_feed = cv2.VideoCapture(0)
cam_feed.set(cv2.CAP_PROP_FRAME_WIDTH, 650)
cam_feed.set(cv2.CAP_PROP_FRAME_HEIGHT, 750)

# Constants for distance estimation
KNOWN_HEIGHT = 170  # Average human height in cm
FOCAL_LENGTH = 500  # Placeholder for focal length

def estimate_distance(height_pixels):
    """Calculate the distance based on object height in pixels."""
    return (KNOWN_HEIGHT * FOCAL_LENGTH) / height_pixels if height_pixels > 0 else None

def draw_detections(frame, results):
    """Draw bounding boxes and labels on the frame."""
    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates
            height_pixels = y2 - y1  # Object height in pixels
            confidence = box.conf[0].item() * 100  # Confidence score
            class_id = int(box.cls[0].item())  # Class ID
            label = f"{model.names[class_id]} {confidence:.2f}%"

            # Estimate distance
            distance = estimate_distance(height_pixels)
            if distance:
                label += f" {distance:.2f} cm"

            # Draw rectangle and label
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

def main():
    """Main loop for object detection and distance estimation."""
    while True:
        ret, frame = cam_feed.read()
        if not ret:
            break  # Exit loop if camera feed is unavailable

        results = model(frame)  # Perform object detection
        draw_detections(frame, results)  # Annotate frame with detections

        cv2.imshow("YOLOv5 Object Detection with Distance Estimation", frame)

        # Exit on 'q' or 'esc'
        if cv2.waitKey(1) in [ord("q"), 27]:
            break

    cam_feed.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
