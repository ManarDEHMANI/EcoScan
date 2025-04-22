from .config import MONGODB_URI as mongo_uri
from pymongo import MongoClient

def get_db(test_client=None):
    if test_client:
        return test_client["EcoScan"]
    client = MongoClient(mongo_uri)
    return client["EcoScan"]

etiquettes_collection = get_db()["tags_info"]