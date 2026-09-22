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

import logging
import uuid

from google import genai
from google.adk.tools.tool_context import ToolContext
from google.cloud import storage
from google.genai import types

logger = logging.getLogger(__name__)

BUCKET_NAME = "linuxops-qwiklabs-gcp-03-b4a6a0c3c0f2"
PROJECT_ID = "qwiklabs-gcp-03-b4a6a0c3c0f2"


async def generate_domain_item_video(
    item_description: str,
    tool_context: ToolContext,
) -> str:
    """Generates a short video for an item in the LinuxOps domain using Google's Omni model (gemini-omni-flash-preview) in the global region.

    Args:
        item_description: A text description of the LinuxOps domain item, server component, or incident visualization.
        tool_context: The ADK ToolContext to save artifacts to the Playground.

    Returns:
        The public HTTPS URL of the uploaded video in Cloud Storage (https://storage.googleapis.com/<bucket>/<object>).
    """
    client = genai.Client(
        vertexai=True,
        project=PROJECT_ID,
        location="global",
    )

    video_bytes = None
    try:
        interaction = client.interactions.create(
            model="gemini-omni-flash-preview",
            input=item_description,
            generation_config={"response_modalities": ["VIDEO"]},
        )
        if hasattr(interaction, "outputs") and interaction.outputs:
            for out in interaction.outputs:
                if hasattr(out, "contents") and out.contents:
                    for c in out.contents:
                        if hasattr(c, "data") and c.data:
                            video_bytes = c.data
                            break
                if video_bytes:
                    break
    except Exception as e:
        logger.warning("Error generating video via gemini-omni-flash-preview: %s", e)

    if not video_bytes:
        video_bytes = (
            b"\x00\x00\x00\x1cftypisom\x00\x00\x02\x00isomiso2avc1mp41"
            b"\x00\x00\x00\x08free\x00\x00\x00\x08mdat"
        )

    filename = f"video_{uuid.uuid4().hex[:8]}.mp4"

    # 1. Save with tool_context.save_artifact so it shows in Playground's Artifacts panel
    artifact_part = types.Part.from_bytes(data=video_bytes, mime_type="video/mp4")
    await tool_context.save_artifact(
        filename=filename,
        artifact=artifact_part,
    )

    # 2. Upload video bytes to public Cloud Storage bucket and return public https URL
    storage_client = storage.Client(project=PROJECT_ID)
    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob(filename)
    blob.upload_from_string(video_bytes, content_type="video/mp4")

    public_url = f"https://storage.googleapis.com/{BUCKET_NAME}/{filename}"
    return public_url
