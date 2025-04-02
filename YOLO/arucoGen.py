import cv2
from cv2 import aruco

# Define the ArUco dictionary
aruco_dict = aruco.getPredefinedDictionary(aruco.DICT_6X6_250)

# Generate an ArUco marker
marker_id = 0  # You can change this ID to any valid ID within the dictionary
marker_size = 200  # Size of the marker in pixels

marker_image = aruco.generateImageMarker(aruco_dict, marker_id, marker_size)

# Save the marker image
cv2.imwrite("aruco_marker.png", marker_image)

# Display the marker image
cv2.imshow("ArUco Marker", marker_image)
cv2.waitKey(0)
cv2.destroyAllWindows()