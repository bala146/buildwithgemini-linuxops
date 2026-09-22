# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Seed script for allergy-agent Firestore collection."""

import time
from google.cloud import firestore

# HARDCODED GCP PROJECT ID as required for Agent Platform deployment safety
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


def seed_firestore():
    """Seeds the Firestore database with initial food allergen records with retry logic."""
    print(f"Connecting to Firestore for project: {PROJECT_ID}...")
    db = firestore.Client(project=PROJECT_ID)
    collection_ref = db.collection(COLLECTION_NAME)

    print(f"Seeding items into collection '{COLLECTION_NAME}'...")
    for item in SEED_ITEMS:
        doc_id = item["food_name"].lower().replace(" ", "_")
        doc_ref = collection_ref.document(doc_id)
        
        success = False
        for attempt in range(5):
            try:
                doc_ref.set(item)
                print(f"  ✓ Seeded document: {doc_id} -> {item['food_name']}")
                success = True
                break
            except Exception as e:
                print(f"  ⚠️ Attempt {attempt + 1} failed for {doc_id}: {e}. Retrying in 2s...")
                time.sleep(2)
        if not success:
            print(f"  ❌ Failed to seed document {doc_id} after 5 attempts.")

    print("✅ Firestore seeding loop finished!")


if __name__ == "__main__":
    seed_firestore()
