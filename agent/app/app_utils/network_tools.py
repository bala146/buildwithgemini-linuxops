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

"""Network diagnostics tools for LinuxOps SRE Agent using free public API."""

import json
import os
import requests


def lookup_ip_network_info(ip_or_domain: str = "") -> str:
    """Queries public IP geolocation and ISP network infrastructure info for a target server IP or domain.

    Args:
        ip_or_domain: Target IP address or domain name (e.g. '8.8.8.8', 'github.com').
                      If empty, looks up the current public IP.

    Returns:
        JSON string containing network details (ISP, organization, AS number, country, city, timezone).
    """
    target = ip_or_domain.strip() if ip_or_domain else ""
    api_key = os.getenv("IP_API_KEY", "")

    url = f"http://ip-api.com/json/{target}"
    params = {}
    if api_key:
        params["key"] = api_key

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        return json.dumps(data, indent=2)
    except Exception as e:
        return json.dumps({"status": "fail", "error": f"Failed to fetch IP network info: {e}"})
