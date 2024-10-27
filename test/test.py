from ultralytics import YOLO
import os
import torch

# Define the path to the image
dir_path = os.path.dirname(os.path.abspath(__file__))

# Load the YOLOv8 model
model = YOLO('yolov8n.pt')

results = model("test.jpg")

for result in results:
    result.show()
