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

import json
import logging
import re
from typing import Any

from a2ui.basic_catalog.provider import BasicCatalog
from a2ui.schema.manager import A2uiSchemaManager
from google.adk.agents.callback_context import CallbackContext

logger = logging.getLogger(__name__)


def build_a2ui_system_prompt(role_description: str, version: str = "0.8") -> str:
    """Builds an A2UI system prompt using A2uiSchemaManager and BasicCatalog."""
    manager = A2uiSchemaManager(
        version=version,
        catalogs=[BasicCatalog.get_config(version)],
    )
    return manager.generate_system_prompt(role_description)


def parse_a2ui_blocks(text: str) -> list[dict[str, Any]]:
    """Parses all <a2ui-json>...</a2ui-json> blocks from string."""
    if not text:
        return []
    pattern = r"<a2ui-json>\s*(.*?)\s*</a2ui-json>"
    matches = re.findall(pattern, text, re.DOTALL)
    payloads = []
    for match in matches:
        try:
            payloads.append(json.loads(match.strip()))
        except json.JSONDecodeError as e:
            logger.warning("Failed to decode A2UI JSON payload: %s", e)
    return payloads


async def a2ui_after_model_callback(callback_context: CallbackContext) -> None:
    """Processes model outputs to extract and handle A2UI components."""
    output_text = getattr(callback_context, "output", "")
    if not isinstance(output_text, str):
        output_text = str(output_text) if output_text else ""

    payloads = parse_a2ui_blocks(output_text)
    if payloads:
        logger.info("Extracted %d A2UI payload(s) from model response.", len(payloads))
        if hasattr(callback_context, "state") and callback_context.state is not None:
            callback_context.state["a2ui_payloads"] = payloads
