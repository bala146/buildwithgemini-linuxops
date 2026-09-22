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

"""Setup script for Vertex AI Serverless RAG Corpus."""

import json
import os
import vertexai
from google.cloud import storage
from vertexai import rag

PROJECT_ID = "qwiklabs-gcp-03-b4a6a0c3c0f2"
LOCATION = "us-west1"
GCS_BUCKET = "linuxops-qwiklabs-gcp-03-b4a6a0c3c0f2"
LOCAL_FILE = "/config/Desktop/allergy-agent/data/pg49513.txt"
GCS_BLOB_NAME = "rag/pg49513.txt"
CORPUS_DISPLAY_NAME = "complete_herbal_corpus"


def setup_rag():
    print(f"Initializing Vertex AI (Project: {PROJECT_ID}, Location: {LOCATION})...")
    vertexai.init(project=PROJECT_ID, location=LOCATION)

    # Step 1: Check existing corpora or create new one
    print("Listing existing RAG corpora...")
    existing_corpora = rag.list_corpora()
    target_corpus = None
    for c in existing_corpora:
        if CORPUS_DISPLAY_NAME in c.display_name:
            print(f"Found existing corpus: {c.name} ({c.display_name})")
            target_corpus = c
            break

    if not target_corpus:
        print(f"Creating new serverless RAG corpus '{CORPUS_DISPLAY_NAME}'...")
        target_corpus = rag.create_corpus(
            display_name=CORPUS_DISPLAY_NAME,
            description="Complete Herbal by Nicholas Culpeper grounding corpus",
        )
        print(f"Created corpus: {target_corpus.name}")

    # Step 2: Upload local file to GCS
    print(f"Uploading {LOCAL_FILE} to GCS bucket {GCS_BUCKET}...")
    storage_client = storage.Client(project=PROJECT_ID)
    bucket = storage_client.bucket(GCS_BUCKET)
    blob = bucket.blob(GCS_BLOB_NAME)
    blob.upload_from_filename(LOCAL_FILE)
    gcs_uri = f"gs://{GCS_BUCKET}/{GCS_BLOB_NAME}"
    print(f"File uploaded to {gcs_uri}")

    # Step 3: Import and index file into RAG corpus
    print(f"Importing {gcs_uri} into RAG corpus {target_corpus.name}...")
    import_response = rag.import_files(
        corpus_name=target_corpus.name,
        paths=[gcs_uri],
        transformation_config=rag.TransformationConfig(
            chunking_config=rag.ChunkingConfig(
                chunk_size=512,
                chunk_overlap=100,
            )
        ),
    )
    print(f"Import finished. Imported {import_response.imported_rag_files_count} files.")

    # Save corpus name to config file for the agent to load
    config_data = {
        "corpus_name": target_corpus.name,
        "display_name": target_corpus.display_name,
        "project_id": PROJECT_ID,
        "location": LOCATION,
    }
    config_path = "/config/Desktop/allergy-agent/app/app_utils/rag_config.json"
    with open(config_path, "w") as f:
        json.dump(config_data, f, indent=2)
    print(f"Saved RAG config to {config_path}")

    return target_corpus.name


if __name__ == "__main__":
    corpus_name = setup_rag()
    print(f"✅ RAG setup completed! Corpus Name: {corpus_name}")
