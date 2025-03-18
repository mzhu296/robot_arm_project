import cv2 as cv
from cv2 import aruco
import numpy as np
import os

# Load camera calibration data
script_dir = os.path.dirname(__file__)  
calib_data_path = os.path.join(script_dir, "MultiMatrix.npz")  

calib_data = np.load(calib_data_path)
cam_mat = calib_data["camMatrix"]
dist_coef = calib_data["distCoef"]

# ArUco Marker settings
MARKER_SIZE = 10  # cm
marker_dict = aruco.getPredefinedDictionary(aruco.DICT_5X5_250)
param_markers = aruco.DetectorParameters()

# Load MobileNet Model
prototxt_path = r"C:\SE4450\ArmApplication\SE4450_Team21_ArmApplication\OpenCV\deploy.prototxt"
caffemodel_path = r"C:\SE4450\ArmApplication\SE4450_Team21_ArmApplication\OpenCV\mobilenet_iter_73000.caffemodel"
net = cv.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)

# List of detectable objects
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat", "bottle", "bus", "car", "cat", "chair", "cow",
           "diningtable", "dog", "horse", "motorbike", "person", "pottedplant", "sheep", "sofa", "train", "tvmonitor"]

# Assign each ArUco ID a default object class (cycling through the CLASSES list)
aruco_id_to_class = {i: CLASSES[i % len(CLASSES)] for i in range(100)}

# Start video capture
cap = cv.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to grayscale for better detection
    gray_frame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

  # Detect ArUco markers
    marker_corners, marker_IDs, _ = aruco.detectMarkers(gray_frame, marker_dict, parameters=param_markers)

    # Detect ArUco markers
    marker_corners, marker_IDs, _ = aruco.detectMarkers(gray_frame, marker_dict, parameters=param_markers)

    # ✅ Ensure both marker_IDs and marker_corners are valid
    if marker_IDs is not None and marker_corners is not None and len(marker_IDs) > 0:
        rVec, tVec, _ = aruco.estimatePoseSingleMarkers(marker_corners, MARKER_SIZE, cam_mat, dist_coef)
    
        for i, (ids, corners) in enumerate(zip(marker_IDs, marker_corners)):  # ✅ Only runs when markers exist
            marker_id = ids[0]
            marker_name = aruco_id_to_class.get(marker_id, "Unknown")

            # Draw marker boundary
            cv.polylines(frame, [corners.astype(np.int32)], True, (0, 255, 255), 4, cv.LINE_AA)

            # Reshape corners and extract positions
            corners = corners.reshape(4, 2).astype(int)
            top_right, top_left, bottom_right, bottom_left = corners

            # Calculate distance from camera
            distance = np.sqrt(tVec[i][0][2] ** 2 + tVec[i][0][0] ** 2 + tVec[i][0][1] ** 2)

            # Draw pose axes
            cv.drawFrameAxes(frame, cam_mat, dist_coef, rVec[i], tVec[i], 4, 4)

            # Display marker ID and assigned name
            cv.putText(frame, f"ID: {marker_id} | {marker_name}", top_right, cv.FONT_HERSHEY_PLAIN, 1.3, (0, 0, 255), 2, cv.LINE_AA)
            cv.putText(frame, f"Dist: {round(distance, 2)}cm", bottom_right, cv.FONT_HERSHEY_PLAIN, 1.0, (0, 0, 255), 2, cv.LINE_AA)

    # Show the frame
    cv.imshow("ArUco Marker + Object Detection", frame)
    
    # Exit on 'q' key press
    if cv.waitKey(1) & 0xFF == ord("q"):
        break

# Cleanup
cap.release()
cv.destroyAllWindows()
