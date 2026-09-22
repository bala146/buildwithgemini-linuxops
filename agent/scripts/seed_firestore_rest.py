import google.auth
from google.auth.transport.requests import Request
import requests

PROJECT_ID = "qwiklabs-gcp-03-b4a6a0c3c0f2"
COLLECTION_NAME = "food_allergens"

SEED_ITEMS = [
    {
        "food_name": "Peanut Butter",
        "allergens": ["Peanuts", "Tree Nuts"],
        "severity": "HIGH",
        "safe_substitutes": ["Sunflower Seed Butter", "Soy Nut Butter"],
        "category": "Nuts & Spreads",
        "notes": "Contains severe allergen (Peanuts). Cross-contamination risk in standard processing facilities.",
    },
    {
        "food_name": "Almond Milk",
        "allergens": ["Tree Nuts"],
        "severity": "HIGH",
        "safe_substitutes": ["Oat Milk", "Rice Milk", "Soy Milk"],
        "category": "Dairy Alternatives",
        "notes": "Plant-based milk derived from almonds. Unsafe for individuals with tree nut allergies.",
    },
    {
        "food_name": "Shrimp Pad Thai",
        "allergens": ["Shellfish", "Fish Sauce", "Peanuts"],
        "severity": "HIGH",
        "safe_substitutes": ["Vegetable Tofu Pad Thai (Peanut-Free)"],
        "category": "Prepared Foods",
        "notes": "Contains crustaceans (shrimp) and peanuts. High anaphylaxis risk for shellfish allergic users.",
    },
    {
        "food_name": "Rolled Oatmeal",
        "allergens": [],
        "severity": "LOW",
        "safe_substitutes": ["Certified Gluten-Free Oats"],
        "category": "Grains",
        "notes": "Naturally gluten-free grain, but check for certified gluten-free processing if celiac.",
    },
    {
        "food_name": "Whole Milk Yogurt",
        "allergens": ["Dairy", "Lactose"],
        "severity": "MEDIUM",
        "safe_substitutes": ["Coconut Milk Yogurt", "Oat Yogurt"],
        "category": "Dairy",
        "notes": "Contains milk proteins (casein, whey) and lactose. Unsafe for dairy allergic users.",
    },
]

def to_firestore_value(val):
    if isinstance(val, str):
        return {"stringValue": val}
    elif isinstance(val, list):
        return {"arrayValue": {"values": [to_firestore_value(v) for v in val]}}
    elif isinstance(val, bool):
        return {"booleanValue": val}
    elif isinstance(val, int):
        return {"integerValue": str(val)}
    return {"stringValue": str(val)}

def seed_rest():
    creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
    creds.refresh(Request())
    
    headers = {
        "Authorization": f"Bearer {creds.token}",
        "Content-Type": "application/json",
    }
    
    for item in SEED_ITEMS:
        doc_id = item["food_name"].lower().replace(" ", "_")
        url = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/{COLLECTION_NAME}/{doc_id}"
        
        fields = {k: to_firestore_value(v) for k, v in item.items()}
        payload = {"fields": fields}
        
        res = requests.patch(url, headers=headers, json=payload)
        print(f"Status for {doc_id}: {res.status_code}")
        if res.status_code != 200:
            print("Error response:", res.text)

if __name__ == "__main__":
    seed_rest()
