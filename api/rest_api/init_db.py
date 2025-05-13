from pymongo import MongoClient
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
# MongoDB Client
client = MongoClient(MONGODB_URI)
db = client["EcoScan"]
collection = db["tags_info"]
class TagInfo(BaseModel):
    tag: str
    description: Optional[str] = None
    impact: Optional[str] = None
    practice: Optional[str] = None
    harmfulness: Optional[str] = None
    toxicity: Optional[list[int]] = []
# List of tags to insert
etiquettes = [
    {
        "tag": "juice",
        "description": "Fruit-based beverages containing natural and sometimes added sugars. Limit consumption to 1 small glass per day due to high sugar content, prefer whole fruits.",
    },
    {
        "tag": "water",
        "description": "Essential daily beverage for hydration and body function. Recommended intake is 2-3 liters per day, adjusting based on activity level and climate.",
    },
    {
        "tag": "milk",
        "description": "Dairy beverages and alternatives providing calcium and protein. Consider individual lactose tolerance and nutritional needs when choosing varieties.",
    },
    {
        "tag": "soft-drink",
        "description": "Carbonated, sweetened beverages high in sugar content. Limit or avoid consumption for better health; opt for water or unsweetened drinks.",
    },
    {
        "tag": "cleaning",
        "description": "Chemical solutions for household cleaning. Keep away from food areas, avoid skin contact, use in ventilated spaces, and keep out of reach of children.",
    },
    {
        "tag": "washing",
        "description": "Detergents and cleaning solutions for dishes and laundry. Use according to instructions, avoid skin contact, and keep away from food items.",
    },
   {
        "tag": "alcohol",
        "description": "Spirits, wines, and liqueurs containing varying levels of alcohol. Consume in moderation following health guidelines: maximum 2 drinks per day for men, 1 for women.",
    },
    {
        "tag": "oil",
        "description": "Cooking and seasoning liquids including vegetable, olive, and specialty oils. Use moderately as part of a balanced diet, following recommended daily fat intake guidelines.",
    },
    
    # Plastic Materials
    {
        "tag": "HDPE",
        "description": "HDPE (High-Density Polyethylene) - Opaque. HDPE is a strong, opaque plastic commonly used for milk, detergents, and bleach bottles.",
        "impact": "Takes about 100 years to decompose and has a global recycling rate of ~30%.",
        "practice": "Recycle HDPE correctly, choose products with minimal packaging, and support brands using recycled HDPE.",
        "harmfulness": "Can leach trace chemicals if improperly handled or exposed to extreme conditions.",
        "toxicity": [1]
    },
    {
        "tag": "PET",
        "description": "PET (Polyethylene Terephthalate) - Transparent. PET is a lightweight, clear plastic widely used for water, soft drinks, and juice bottles.",
        "impact": "Can take up to 450 years to decompose with a global recycling rate of ~25%.",
        "practice": "Opt for recycled PET products, diligently recycle PET bottles, and reduce reliance on single-use PET by using reusable containers.",
        "harmfulness": "Can release antimony and phthalates, especially when reused or exposed to high temperatures.",
        "toxicity": [1,2]
    },
    {
        "tag": "TRITAN",
        "description": "TRITAN (Copolyester). TRITAN is a durable, BPA-free copolyester used in reusable water bottles and premium cleaning product containers.",
        "impact": "Similar decomposition time to other plastics and limited recycling options.",
        "practice": "Reuse TRITAN bottles multiple times, properly clean them to extend their lifespan, and dispose of them responsibly when no longer usable.",
        "harmfulness": "May contain BPA substitutes like BPS or BPF, which could also act as endocrine disruptors.",
        "toxicity": [1]
    },
    
    # Glass Materials
    {
        "tag": "sodocalcique",
        "description": "Soda-lime glass is the most widely used glass type for bottles, accounting for about 70-75% of all glass production.",
        "impact": "Highly recyclable with lower energy consumption during recycling compared to production from raw materials.",
        "practice": "Maximize recycling efforts, choose products made with recycled soda-lime glass, and support initiatives that enhance glass recycling rates.",
        "harmfulness": "Fragile and can pose injury risks if shattered.",
        "toxicity": [2]
    },
    {
        "tag": "borosilicate",
        "description": "Borosilicate glass is rarely used for everyday beverage bottles but is ideal for specialized, heat-resistant bottles such as those used in laboratories and kitchens.",
        "impact": "Can be reused for many years due to its resistance to heat and chemicals, but difficult to recycle with standard soda-lime glass.",
        "practice": "Reuse borosilicate bottles for appropriate applications and support recycling facilities that handle borosilicate glass.",
        "harmfulness": "Less shock-resistant than soda-lime glass, still fragile and can cause injuries if broken.",
        "toxicity": [1]
    },
    {
        "tag": "crystal",
        "description": "Crystal glass is typically used for luxury containers like wine carafes and high-end decorative items.",
        "impact": "Less recyclable due to potential lead content and high-energy production, often leading to increased waste when broken.",
        "practice": "Use crystal glass for decorative purposes, recycle lead-free variations when possible, and support sustainable crystal production.",
        "harmfulness": "Traditional crystal may contain lead, which can leach into acidic beverages.",
        "toxicity": [3]
    }
]

# Insert tags into the database, ensuring no duplicates
for etiq in etiquettes:
    if not collection.find_one({"tag": etiq["tag"]}):
        # Ensure the data structure aligns with the TagInfo model
        tag_info = TagInfo(**etiq)  # Convert dict to TagInfo model
        collection.insert_one(tag_info.dict())  # Insert as dict (excluding _id)
        print(f"Added tag: {etiq['tag']}")
    else:
        print(f"The tag '{etiq['tag']}' already exists, skipped.")

print("✅ Initialization completed.")