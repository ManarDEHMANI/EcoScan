
import pytest
from fastapi.testclient import TestClient
from rest_api.main import app

client = TestClient(app)

def test_health_check():
    """Test if API is running."""
    response = client.get("/")
    assert response.status_code == 200

def test_invalid_file_upload():
    """Ensure API rejects non-image files."""
    fake_image = b"not an actual image data"  
    response = client.post("/predict/", files={"file": ("fake.jpg", fake_image, "image/jpeg")})
    assert response.status_code == 400

def test_valid_image_upload():
    """Test API with a sample image."""
    with open("data/bottle.jpeg", "rb") as image_file:
        files = {"file": ("bottle.jpeg", image_file, "image/jpeg")}
        response = client.post("/predict/", files=files)
    
    assert response.status_code == 200
    assert "predictions" in response.json()
