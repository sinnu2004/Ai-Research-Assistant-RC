from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import analyze_company

from app.services.serper_service import get_company_info
from app.services.crawler_service import crawl_website

router = APIRouter()


class ResearchRequest(BaseModel):
    query: str


@router.post("/research")
def research_company(request: ResearchRequest):

    company = get_company_info(request.query)

    scraped_pages = []

    if company.get("website"):
        scraped_pages = crawl_website(
            company["website"]
        )

    company["scraped_pages"] = scraped_pages

    ai_analysis = analyze_company(company)

    company["ai_analysis"] = ai_analysis

    return company