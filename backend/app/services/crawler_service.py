import requests
from urllib.parse import urljoin

COMMON_PAGES = [
    "/about",
    "/about-us",
    "/products",
    "/services",
    "/solutions",
    "/contact",
    "/contact-us",
    "/pricing"
]

def crawl_website(base_url):
    discovered_pages = []

    for page in COMMON_PAGES:
        url = urljoin(base_url, page)

        try:
            response = requests.get(
                url,
                timeout=5,
                headers={"User-Agent": "Mozilla/5.0"}
            )

            if response.status_code == 200:
                discovered_pages.append(url)

        except Exception as e:
            print(e)

    return discovered_pages