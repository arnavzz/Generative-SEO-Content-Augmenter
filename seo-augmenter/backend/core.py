import os
from dotenv import load_dotenv
from groq import Groq
from duckduckgo_search import DDGS

from .prompts import SYSTEM_PROMPT, USER_PROMPT_TEMPLATE
from .utils import fetch_page_text, chunk_text

load_dotenv()
client = Groq(api_key=os.environ["GROQ_API_KEY"])

def search_urls(keyword: str, max_results: int = 8):
    with DDGS() as ddg:
        results = ddg.text(keyword, max_results=max_results)
    return [r["href"] for r in results if "href" in r]

def gather_snippets(keyword: str, max_urls=8, max_chunks=8):
    urls = search_urls(keyword, max_urls)
    all_chunks = []
    for url in urls:
        txt = fetch_page_text(url)
        if not txt:
            continue
        chunks = chunk_text(txt)
        all_chunks.extend(chunks)
        if len(all_chunks) >= max_chunks:
            break
    combined = "\n\n---\n\n".join(all_chunks[:max_chunks])
    return combined, urls

def generate_sections(keyword: str):
    snippets, urls = gather_snippets(keyword)
    user_prompt = USER_PROMPT_TEMPLATE.format(keyword=keyword, snippets=snippets[:20000])  # safety trim
    resp = client.chat.completions.create(
        model="llama3-70b-8192",  # or llama3-8b-8192
        messages=[
            {"role":"system","content": SYSTEM_PROMPT},
            {"role":"user","content": user_prompt}
        ],
        temperature=0.4,
        max_tokens=1800
    )
    content = resp.choices[0].message.content
    return {"keyword": keyword, "sources": urls, "html": content}
