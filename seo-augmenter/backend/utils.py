import re
import requests
from bs4 import BeautifulSoup
import html2text

def clean_text(text: str) -> str:
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def fetch_page_text(url: str, timeout: int = 10) -> str:
    try:
        r = requests.get(url, timeout=timeout, headers={"User-Agent":"Mozilla/5.0"})
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        # Remove script/style
        for tag in soup(["script", "style", "noscript"]):
            tag.decompose()
        raw_html = str(soup)
        md = html2text.HTML2Text()
        md.ignore_links = True
        text = md.handle(raw_html)
        return clean_text(text)
    except Exception:
        return ""
    
def chunk_text(text: str, chunk_size: int = 1200, overlap: int = 200):
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = words[i:i+chunk_size]
        chunks.append(" ".join(chunk))
        i += chunk_size - overlap
    return chunks
