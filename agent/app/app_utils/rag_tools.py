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

"""RAG retrieval tool for Nicholas Culpeper Complete Herbal corpus."""

import json
import os
import vertexai
from vertexai import rag

PROJECT_ID = "qwiklabs-gcp-03-b4a6a0c3c0f2"
LOCATION = "us-west1"
CONFIG_FILE = "/config/Desktop/allergy-agent/app/app_utils/rag_config.json"
DATA_FILE = "/config/Desktop/allergy-agent/data/pg49513.txt"


def _fallback_local_search(query: str, top_k: int = 3) -> str:
    """Searches the local Gutenberg file pg49513.txt for relevant paragraphs."""
    if not os.path.exists(DATA_FILE):
        return f"Herbal text file {DATA_FILE} not found."

    try:
        with open(DATA_FILE, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        paragraphs = [p.strip() for p in content.split("\n\n") if len(p.strip()) > 60]
        keywords = [k.lower() for k in query.split() if len(k) > 2]

        if not keywords:
            keywords = [query.lower()]

        scored_paragraphs = []
        for p in paragraphs:
            p_lower = p.lower()
            score = sum(p_lower.count(k) for k in keywords)
            if score > 0:
                scored_paragraphs.append((score, p))

        scored_paragraphs.sort(key=lambda x: x[0], reverse=True)
        top_matches = [p[1] for p in scored_paragraphs[:top_k]]

        if top_matches:
            formatted_matches = "\n\n---\n\n".join(
                [f"[Excerpt from Nicholas Culpeper's Complete Herbal]\n{p.replace('\n', ' ')}" for p in top_matches]
            )
            return formatted_matches
        return f"No relevant herbal grounding excerpts found for query: '{query}'."
    except Exception as e:
        return f"Error during local herbal file search: {e}"


def query_herbal_rag_corpus(query: str) -> str:
    """Queries the Nicholas Culpeper Complete Herbal RAG Corpus for grounded information on plants, herbs, and traditional remedies.

    Args:
        query: The herb, plant name, or health topic to search for (e.g. 'Mint', 'Thyme', 'Rosemary', 'Sage').

    Returns:
        A formatted string containing retrieved grounded contexts from The Complete Herbal.
    """
    if not query or not query.strip():
        return "Please provide a valid herb or plant query."

    corpus_name = None
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r") as f:
                cfg = json.load(f)
                corpus_name = cfg.get("corpus_name")
        except Exception:
            pass

    if corpus_name:
        try:
            vertexai.init(project=PROJECT_ID, location=LOCATION)
            response = rag.retrieval_query(
                rag_resources=[rag.RagResource(rag_corpus=corpus_name)],
                text=query.strip(),
            )

            contexts = []
            if hasattr(response, "contexts") and response.contexts:
                for ctx in response.contexts.contexts:
                    contexts.append(ctx.text)

            if contexts:
                return "\n\n---\n\n".join(contexts)
        except Exception:
            pass

    return _fallback_local_search(query.strip())
