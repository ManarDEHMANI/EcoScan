from fastapi import FastAPI, File, UploadFile, HTTPException
from .model import predict_image
from pydantic import BaseModel
from typing import List, Optional
from .db import get_db
import uvicorn

app = FastAPI(title="YOLOv8 Image Classification API")
tags_collection = get_db()["tags_info"]
class TagInfo(BaseModel):
    tag: str
    description: Optional[str] = None
    impact: Optional[str] = None
    practice: Optional[str] = None
    harmfulness: Optional[str] = None
    toxicity: Optional[list[int]] = []

@app.get("/")
def health_check():
    return {"status": "OK", "message": "API is up and running!"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        predictions = predict_image(image_bytes)
        print("📸 Predictions brutes YOLO :", predictions)
        
        result = {}
        for label, confidence in predictions.items():
            info = tags_collection.find_one({"tag": label})
            if info:
                info.pop("_id", None)
                info['confidence'] = confidence
                result[label] = info
            else:
                result[label] = {
                    "confidence": confidence,
                    "message": "Information not available"
                }
        return {"predictions": result}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image: {str(e)}")

@app.get("/tag/{tag_name}")
def get_tag_info(tag_name: str):
    info = tags_collection.find_one({"tag": tag_name})
    if info:
        info.pop("_id", None)
        return info
    raise HTTPException(status_code=404, detail="Étiquette non trouvée")

@app.post("/tag/")
def create_tag(info: TagInfo):
    if tags_collection.find_one({"tag": info.tag}):
        raise HTTPException(status_code=400, detail="L'étiquette existe déjà")
    tags_collection.insert_one(info.dict())
    return {"message": "Information ajoutée avec succès"}

@app.put("/tag/{tag_name}")
def update_tag(tag_name: str, new_info: TagInfo):
    result = tags_collection.update_one(
        {"tag": tag_name},
        {"$set": new_info.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Étiquette non trouvée")
    return {"message": "Information mise à jour"}

@app.delete("/tag/{tag_name}")
def delete_tag(tag_name: str):
    result = tags_collection.delete_one({"tag": tag_name})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Étiquette non trouvée")
    return {"message": "Information supprimée"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    