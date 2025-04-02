from ultralytics import YOLO
from PIL import Image
import torch
import io
from .config import MODEL_PATH

# Load YOLO model once at startup
model = YOLO(MODEL_PATH)

def predict_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    results = model(image)

    predictions = {}
    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0])  # Class ID
            confidence = float(box.conf[0])  # Confidence score
            class_name = model.names[cls_id]  # Class name
            predictions[class_name] = round(confidence, 2)

    return predictions
