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
    impact: str
    practice: str
    harmfulness: str
# List of tags to insert
etiquettes = [
    # Plastic Bottles
    {
        "tag": "juice",
        "description": "Bottled juices like orange and apple are made from PET or HDPE. Consume in moderation to avoid excess sugar.",
        "impact": "PET takes up to 450 years to decompose.",
        "practice": "Recycle properly or choose glass containers.",
        "harmfulness": "PET can leach antimony and phthalates when reused or heated."
    },
    {
        "tag": "water",
        "description": "Bottled water, including sparkling types, uses PET bottles. Stay hydrated but limit plastic use.",
        "impact": "Single-use PET contributes to marine pollution.",
        "practice": "Use reusable bottles and filter tap water.",
        "harmfulness": "PET may leach microplastics and chemicals like antimony, especially when exposed to heat or reused."
    },
    {
        "tag": "milk",
        "description": "Milk and dairy alternatives are packaged in opaque HDPE bottles. Balance intake to accommodate lactose tolerance.",
        "impact": "HDPE takes ~100 years to decompose.",
        "practice": "Buy in bulk, recycle correctly, or use reusable containers.",
        "harmfulness": "HDPE can leach trace chemicals if improperly handled or exposed to extreme conditions."
    },
    {
        "tag": "soft-drink",
        "description": "Carbonated drinks like Coca-Cola and Pepsi use PET bottles. Limit sugary drinks to maintain health.",
        "impact": "PET pollution harms oceans.",
        "practice": "Recycle diligently and reduce single-use soft drinks.",
        "harmfulness": "PET degrades into microplastics and releases chemicals like antimony when exposed to heat or reused."
    },
    {
        "tag": "cleaning",
        "description": "Cleaners such as detergents and bleach are stored in HDPE bottles. Use safely and avoid chemical exposure.",
        "impact": "HDPE contributes to long-term plastic waste.",
        "practice": "Choose concentrated or eco-friendly products and recycle properly.",
        "harmfulness": "HDPE can leach trace chemicals over time, posing environmental contamination risks."
    },
    {
        "tag": "washing",
        "description": "Dishwashing liquids and laundry detergents use HDPE and TRITAN. Follow usage instructions to prevent irritation.",
        "impact": "TRITAN has limited recycling options.",
        "practice": "Opt for biodegradable cleaners and reuse or recycle containers.",
        "harmfulness": "TRITAN may contain BPA substitutes like BPS or BPF, potential endocrine disruptors."
    },
    # Plastic Materials
    {
        "tag": "HDPE",
        "description": "HDPE (High-Density Polyethylene) - Opaque. HDPE is a strong, opaque plastic commonly used for milk, detergents, and bleach bottles.",
        "impact": "Takes about 100 years to decompose and has a global recycling rate of ~30%.",
        "practice": "Recycle HDPE correctly, choose products with minimal packaging, and support brands using recycled HDPE.",
        "harmfulness": "Can leach trace chemicals if improperly handled or exposed to extreme conditions."
    },
    {
        "tag": "PET",
        "description": "PET (Polyethylene Terephthalate) - Transparent. PET is a lightweight, clear plastic widely used for water, soft drinks, and juice bottles.",
        "impact": "Can take up to 450 years to decompose with a global recycling rate of ~25%.",
        "practice": "Opt for recycled PET products, diligently recycle PET bottles, and reduce reliance on single-use PET by using reusable containers.",
        "harmfulness": "Can release antimony and phthalates, especially when reused or exposed to high temperatures."
    },
    {
        "tag": "TRITAN",
        "description": "TRITAN (Copolyester). TRITAN is a durable, BPA-free copolyester used in reusable water bottles and premium cleaning product containers.",
        "impact": "Similar decomposition time to other plastics and limited recycling options.",
        "practice": "Reuse TRITAN bottles multiple times, properly clean them to extend their lifespan, and dispose of them responsibly when no longer usable.",
        "harmfulness": "May contain BPA substitutes like BPS or BPF, which could also act as endocrine disruptors."
    },
    # Glass Bottles
    {
        "tag": "alcohol",
        "description": "Alcohol bottles, including those for spirits, wine, and liqueurs, are typically crafted from robust soda-lime glass with unique shapes and closures.",
        "impact": "Energy-intensive to produce but fully recyclable.",
        "practice": "Reuse bottles for storage or decoration, return them for recycling when possible, and support brands that use recycled glass.",
        "harmfulness": "Fragile and heavy, increasing transportation-related emissions."
    },
    {
        "tag": "water",
        "description": "Glass water bottles are valued for their purity and lack of chemical leaching.",
        "impact": "Heavier than plastic, increasing transportation emissions, but entirely recyclable.",
        "practice": "Use reusable glass water bottles, avoid single-use options, and ensure proper recycling after use.",
        "harmfulness": "Heavier than plastic, posing breakage risks."
    },
    {
        "tag": "juice",
        "description": "Glass juice bottles preserve flavor without altering taste, often made from clear or amber soda-lime glass.",
        "impact": "Reusable and recyclable, reducing plastic pollution.",
        "practice": "Choose glass juice bottles, recycle them after use, and prefer products with minimal glass packaging.",
        "harmfulness": "Fragile and can lead to breakage."
    },
    {
        "tag": "oil",
        "description": "Oil bottles are usually made from amber or clear soda-lime glass to protect contents from light degradation.",
        "impact": "Reusable and recyclable, decreasing reliance on plastic containers.",
        "practice": "Reuse oil bottles for storage or other purposes, recycle them appropriately, and support sustainable packaging choices.",
        "harmfulness": "Fragile and can cause spills if broken."
    },
    
    # Glass Materials
    {
        "tag": "sodocalcique",
        "description": "Soda-lime glass is the most widely used glass type for bottles, accounting for about 70-75% of all glass production.",
        "impact": "Highly recyclable with lower energy consumption during recycling compared to production from raw materials.",
        "practice": "Maximize recycling efforts, choose products made with recycled soda-lime glass, and support initiatives that enhance glass recycling rates.",
        "harmfulness": "Fragile and can pose injury risks if shattered."
    },
    {
        "tag": "borosilicate",
        "description": "Borosilicate glass is rarely used for everyday beverage bottles but is ideal for specialized, heat-resistant bottles such as those used in laboratories and kitchens.",
        "impact": "Can be reused for many years due to its resistance to heat and chemicals, but difficult to recycle with standard soda-lime glass.",
        "practice": "Reuse borosilicate bottles for appropriate applications and support recycling facilities that handle borosilicate glass.",
        "harmfulness": "Less shock-resistant than soda-lime glass, still fragile and can cause injuries if broken."
    },
    {
        "tag": "crystal",
        "description": "Crystal glass is typically used for luxury containers like wine carafes and high-end decorative items.",
        "impact": "Less recyclable due to potential lead content and high-energy production, often leading to increased waste when broken.",
        "practice": "Use crystal glass for decorative purposes, recycle lead-free variations when possible, and support sustainable crystal production.",
        "harmfulness": "Traditional crystal may contain lead, which can leach into acidic beverages."
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
