# tests/conftest.py
import pytest
import mongomock
from fastapi.testclient import TestClient
from rest_api.main import app
from app import db as real_db  # permet de patcher la collection Mongo

@pytest.fixture(scope="function")
def test_client():
    # Création d’une MongoDB mockée
    mock_client = mongomock.MongoClient()
    mock_db = mock_client["EcoScan"]
    mock_collection = mock_db["tags_info"]

    # Patch la collection dans l'app
    real_db.tags_collection = mock_collection

    client = TestClient(app)
    return client