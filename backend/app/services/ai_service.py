import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_company(company_data):

    prompt = f"""
    Return ONLY valid JSON.

    No markdown.
    No explanation.
    No code fences.

    Schema:

    {{
    "company_summary": "",
    "products_services": [],
    "business_pain_points": [],
    "top_5_competitors": []
    }}

    Company:
    {company_data}
    """

    response = model.generate_content(prompt)

    clean_text = response.text.strip()
    
    return json.loads(clean_text)