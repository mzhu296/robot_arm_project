from imageai.Detection import ObjectDetection
import cv2
print(cv2.__version__)
import numpy as np

# Initialize Object Detection
obj_detect = ObjectDetection()
obj_detect.setModelTypeAsYOLOv3()
obj_detect.setModelPath(r"C:/yoloFiles/yolo.h5")
obj_detect.loadModel()

# Start webcam feed
cam_feed = cv2.VideoCapture(0)
cam_feed.set(cv2.CAP_PROP_FRAME_WIDTH, 650)
cam_feed.set(cv2.CAP_PROP_FRAME_HEIGHT, 750)

while True:
    ret, frame = cam_feed.read()
    if not ret:
        break  # Exit loop if there's an issue with the webcam feed

    # Perform object detection
    annotated_image, preds = obj_detect.detectObjectsFromImage(
        input_image=frame,
        input_type="array",
        output_type="array",
        display_percentage_probability=False,
        display_object_name=True
    )

    # Display the annotated image
    cv2.imshow("YOLO Object Detection", annotated_image)

    # Exit condition (Press 'q' or 'Esc')
    key = cv2.waitKey(1)
    if key == ord("q") or key == 27:
        break

# Release resources
cam_feed.release()
cv2.destroyAllWindows()
