import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

COMMON_PAGES = [
    "/about",
    "/about-us",
    "/products",
    "/services",
    "/solutions"
]

def crawl_website(base_url):

    scraped_content = []

    for page in COMMON_PAGES:

        url = urljoin(base_url, page)

        try:
            response = requests.get(
                url,
                timeout=5,
                headers={
                    "User-Agent": "Mozilla/5.0"
                }
            )

            if response.status_code == 200:

                soup = BeautifulSoup(
                    response.text,
                    "html.parser"
                )

                text = soup.get_text(
                    separator=" ",
                    strip=True
                )

                scraped_content.append(
                    {
                        "url": url,
                        "content": text[:3000]
                    }
                )

        except Exception as e:
            print(e)

    return scraped_content