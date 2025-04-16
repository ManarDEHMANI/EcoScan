import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Use the environment variable or fallback to a default path
MODEL_PATH = os.getenv("MODEL_PATH", "../test/yolov8n.pt")
print(f"Using YOLO model at: {MODEL_PATH}")