import requests
from app.core.config import SERPER_API_KEY

SERPER_URL = "https://google.serper.dev/search"


def get_company_info(company_name: str):

    payload = {
        "q": company_name
    }

    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(
        SERPER_URL,
        json=payload,
        headers=headers
    )

    data = response.json()

    result = {
        "company_name": company_name,
        "website": None,
        "phone": None,
        "address": None,
        "description": None
    }

    if data.get("organic"):
        result["website"] = data["organic"][0].get("link")

    if data.get("knowledgeGraph"):

        kg = data["knowledgeGraph"]

        result["description"] = kg.get("description")
        result["website"] = kg.get("website") or result["website"]

        if "attributes" in kg:
            result["phone"] = kg["attributes"].get("Phone")
            result["address"] = kg["attributes"].get("Address")

    return result