from fastapi import FastAPI, File, UploadFile, HTTPException
from .model import predict_image
import uvicorn

app = FastAPI(title="YOLOv8 Image Classification API")

@app.get("/")
def health_check():
    """Health check endpoint to verify API is running"""
    return {"status": "OK", "message": "API is up and running!"}
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        predictions = predict_image(image_bytes)
        print(predictions)
        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
