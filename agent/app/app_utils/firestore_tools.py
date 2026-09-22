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

"""Firestore tools for allergy-agent."""

import json
from google.cloud import firestore

# HARDCODED PROJECT ID as required for Agent Platform deployment safety
PROJECT_ID = "qwiklabs-gcp-03-b4a6a0c3c0f2"
COLLECTION_NAME = "food_allergens"


def get_firestore_client() -> firestore.Client:
    """Returns a Firestore client initialized with hardcoded project ID."""
    return firestore.Client(project=PROJECT_ID)


def search_food_allergens_database(query: str) -> str:
    """Searches the Firestore food_allergens database for matching food items or allergens.

    Args:
        query: The food name, ingredient, or allergen to search for (e.g. 'Peanut Butter', 'Milk', 'Shrimp').

    Returns:
        A JSON formatted string containing matching food allergen records.
    """
    db = get_firestore_client()
    collection_ref = db.collection(COLLECTION_NAME)

    query_lower = query.strip().lower()
    doc_id = query_lower.replace(" ", "_")

    # Direct document lookup first
    doc = collection_ref.document(doc_id).get()
    if doc.exists:
        data = doc.to_dict()
        data["id"] = doc.id
        return json.dumps([data], indent=2)

    # Search all documents for partial match
    results = []
    docs = collection_ref.stream()
    for d in docs:
        d_data = d.to_dict()
        d_data["id"] = d.id
        
        food_name = d_data.get("food_name", "").lower()
        allergens = [a.lower() for a in d_data.get("allergens", [])]
        category = d_data.get("category", "").lower()

        if (
            query_lower in food_name
            or query_lower in category
            or any(query_lower in a for a in allergens)
        ):
            results.append(d_data)

    if results:
        return json.dumps(results, indent=2)

    return f"No records found in Firestore collection '{COLLECTION_NAME}' for query: '{query}'."


def add_or_update_food_allergen(
    food_name: str,
    allergens: list[str],
    severity: str = "MEDIUM",
    safe_substitutes: list[str] | None = None,
    category: str = "General",
    notes: str = "",
) -> str:
    """Adds a new food item or updates an existing record in the Firestore food_allergens collection.

    Args:
        food_name: The name of the food item (e.g. 'Cashew Cheese').
        allergens: List of known allergens in this food item (e.g. ['Tree Nuts']).
        severity: Risk level ('HIGH', 'MEDIUM', 'LOW').
        safe_substitutes: List of safe alternative food items.
        category: Food category (e.g. 'Dairy', 'Nuts & Spreads').
        notes: Safety precautions or allergen notes.

    Returns:
        A success message with the created/updated document ID.
    """
    subs = safe_substitutes if safe_substitutes is not None else []

    db = get_firestore_client()
    collection_ref = db.collection(COLLECTION_NAME)

    doc_id = food_name.strip().lower().replace(" ", "_")
    doc_ref = collection_ref.document(doc_id)

    record = {
        "food_name": food_name.strip(),
        "allergens": allergens,
        "severity": severity.upper(),
        "safe_substitutes": subs,
        "category": category,
        "notes": notes,
    }

    doc_ref.set(record, merge=True)
    return f"Successfully saved food allergen record '{doc_id}' in Firestore database '{PROJECT_ID}'."
