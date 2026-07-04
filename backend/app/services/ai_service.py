import google.generativeai as genai
import os
from dotenv import load_dotenv
from google.api_core.exceptions import ResourceExhausted
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

    Company Information:
        {company_data}

        Use both company information and scraped website
        content to generate insights.

        Focus on:
        1. Company summary
        2. Products and services
        3. Business pain points
        4. Top competitors
        """

    response = model.generate_content(prompt)

    clean_text = response.text.strip()
    
    
    return json.loads(clean_text)