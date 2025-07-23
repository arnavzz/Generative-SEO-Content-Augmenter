from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from .core import generate_sections

app = FastAPI(title="Generative SEO Content Augmenter")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/generate")
def generate(keyword: str = Query(..., min_length=2)):
    result = generate_sections(keyword)
    return result
