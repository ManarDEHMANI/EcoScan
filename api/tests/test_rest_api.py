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

def test_tag_crud(test_client):
    tag = {
        "tag": "mock_test",
        "description": "mock desc",
        "impact": "mock impact",
        "practice": "mock practice",
        "harmfulness": "mock harmfulness"
    }

    # POST
    res = test_client.post("/tag/", json=tag)
    assert res.status_code == 200

    # GET
    res = test_client.get("/tag/mock_test")
    assert res.status_code == 200
    assert res.json()["description"] == "mock desc"
    assert res.json()["impact"] == "mock impact"
    assert res.json()["practice"] == "mock practice"
    assert res.json()["harmfulness"] == "mock harmfulness"

    # PUT
    tag["description"] = "updated desc"
    res = test_client.put("/tag/mock_test", json=tag)
    assert res.status_code == 200

    # DELETE
    res = test_client.delete("/tag/mock_test")
    assert res.status_code == 200