import os
from dotenv import load_dotenv
from pathlib import Path

def get_model_path():
    # Go from rest_api/main.py up to project root
    root_dir = Path(__file__).resolve().parents[2]
    return root_dir / os.getenv("MODEL_PATH", "api/best.pt")

model_path = get_model_path()
print(f"Using YOLO model at: {model_path}")

# Load environment variables
load_dotenv()

# Use the environment variable or fallback to a default path
MODEL_PATH = os.getenv("MODEL_PATH", "../best.pt")
print(f"Using YOLO model at: {MODEL_PATH}")
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")