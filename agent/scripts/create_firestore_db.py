import requests
import google.auth
from google.auth.transport.requests import Request

credentials, project = google.auth.default(scopes=["https://www.googleapis.com/auth/cloud-platform"])
credentials.refresh(Request())

url = f"https://firestore.googleapis.com/v1/projects/qwiklabs-gcp-03-b4a6a0c3c0f2/databases?databaseId=(default)"
headers = {
    "Authorization": f"Bearer {credentials.token}",
    "Content-Type": "application/json"
}
payload = {
    "locationId": "us-east1",
    "type": "FIRESTORE_NATIVE"
}

response = requests.post(url, headers=headers, json=payload)
print("Status:", response.status_code)
print("Response:", response.text)
