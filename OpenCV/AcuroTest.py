import cv2 as cv
from cv2 import aruco
import numpy as np
import os

script_dir = os.path.dirname(__file__)  # Get the directory where the script is
calib_data_path = os.path.join(script_dir, "MultiMatrix.npz")  # Create the correct path

calib_data = np.load(calib_data_path)


cam_mat = calib_data["camMatrix"]
dist_coef = calib_data["distCoef"]
r_vectors = calib_data["rVector"]
t_vectors = calib_data["tVector"]

# Marker settings
MARKER_SIZE = 10  # centimeters
marker_dict = aruco.getPredefinedDictionary(aruco.DICT_5X5_250)
param_markers = aruco.DetectorParameters()

# Start video capture
cap = cv.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to grayscale for better detection
    gray_frame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    marker_corners, marker_IDs, reject = aruco.detectMarkers(gray_frame, marker_dict, parameters=param_markers)

    if marker_corners:
        rVec, tVec, _ = aruco.estimatePoseSingleMarkers(marker_corners, MARKER_SIZE, cam_mat, dist_coef)
        for i, (ids, corners) in enumerate(zip(marker_IDs, marker_corners)):
            # Draw marker boundary
            cv.polylines(frame, [corners.astype(np.int32)], True, (0, 255, 255), 4, cv.LINE_AA)

            # Reshape corners and extract positions
            corners = corners.reshape(4, 2).astype(int)
            top_right, top_left, bottom_right, bottom_left = corners

            # Calculate the distance from the camera
            distance = np.sqrt(tVec[i][0][2] ** 2 + tVec[i][0][0] ** 2 + tVec[i][0][1] ** 2)

            # Draw pose axes
            cv.drawFrameAxes(frame, cam_mat, dist_coef, rVec[i], tVec[i], 4, 4)

            # Display marker ID and distance
            cv.putText(frame, f"ID: {ids[0]} Dist: {round(distance, 2)}cm", top_right, cv.FONT_HERSHEY_PLAIN, 1.3, (0, 0, 255), 2, cv.LINE_AA)
            cv.putText(frame, f"x:{round(tVec[i][0][0], 1)} y:{round(tVec[i][0][1], 1)}", bottom_right, cv.FONT_HERSHEY_PLAIN, 1.0, (0, 0, 255), 2, cv.LINE_AA)

    # Show the frame
    cv.imshow("ArUco Marker Detection", frame)
    
    # Exit on 'q' key press
    if cv.waitKey(1) == ord("q"):
        break

# Cleanup
cap.release()
cv.destroyAllWindows()
