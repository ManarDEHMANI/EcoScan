# 🚀 YOLOv8 Image Classification API

A FastAPI-based REST API for processing images using a **YOLOv8 model**.  
Send an image, and the API will return detected objects with their confidence scores.

## 📌 Features
✅ FastAPI for blazing-fast responses 🚀  
✅ Uses **YOLOv8** for image detection 🎯  
✅ Accepts image uploads via HTTP POST  
✅ JSON response with class labels & confidence scores 📊  
---

## 🔧 Installation Guide

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/yolo-api.git
cd yolo-api
```
### 2️⃣ Create a Virtual Environment
Under the parent folder in this repository run
```sh
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```
### 3️⃣ Install Dependencies
Under the parent folder in this repository run
```sh
pip install -r api/requirements.txt
```
### 4️⃣ Set Up Environment Variables
Create a .env file in the root directory and specify the model path:
```sh
MODEL_PATH=yolov8n.pt
```
## 🚀 Running the API
Start the FastAPI server:
```sh
uvicorn api.main:app --reload
```
## 🛠 Running Tests
To ensure everything works, run:
```sh
pytest tests/
```