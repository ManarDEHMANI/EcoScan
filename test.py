from ultralytics import YOLO
import os

# Define the path to the image
dir_path = os.path.dirname(os.path.abspath(__file__))

# folderImage_path = os.path.join(dir_path,'Bottle Images','Plastic Bottles')
# listImages = os.listdir(folderImage_path)

# Load the YOLOv8 model
model = YOLO('yolov8n.pt')


# for i in range(10):
#     image = listImages[i]
#     results = model(os.path.join(folderImage_path,image))
#     for result in results:
#         result.show()

results = model("img1.jpeg")
for result in results:
    result.show()