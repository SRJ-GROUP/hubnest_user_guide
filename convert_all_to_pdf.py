import os
import sys
import asyncio
from pathlib import Path
from mkdocs.config import load_config
from playwright.async_api import async_playwright
import pypdf

USER_GUIDE_DIR = Path(__file__).resolve().parent
SITE_DIR = USER_GUIDE_DIR / "site"
OUTPUT_DIR = USER_GUIDE_DIR / "generated_pdfs"
INDIVIDUAL_PDF_DIR = OUTPUT_DIR / "individual_pdfs"
FINAL_COMBINED_PDF = OUTPUT_DIR / "HubNest_Complete_User_Guide.pdf"

INDIVIDUAL_PDF_DIR.mkdir(parents=True, exist_ok=True)

PRINT_CUSTOM_CSS = """
@page {
    size: A4;
    margin: 15mm 15mm 15mm 15mm;
}
/* Hide UI elements not relevant for printable PDF */
.md-header, .md-tabs, .md-sidebar, .md-footer, .hubnest-eye-btn, .hubnest-popup-overlay, .md-top, .md-content__button {
    display: none !important;
}
.md-container {
    padding: 0 !important;
}
.md-main__inner {
    margin: 0 !important;
    padding: 0 !important;
}
.md-content {
    margin: 0 !important;
    max-width: 100% !important;
}
.md-content__inner {
    margin: 0 !important;
    padding: 0 !important;
}
body {
    background: #ffffff !important;
    color: #0f172a !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}
/* Ensure Mermaid diagrams and SVGs fit nicely on page */
.mermaid, .mermaid svg, svg {
    max-width: 100% !important;
    height: auto !important;
}
/* Ensure images fit cleanly */
img {
    max-width: 100% !important;
    height: auto !important;
    page-break-inside: avoid;
}
/* Avoid breaking diagrams and tables awkwardly across pages */
pre, table, .admonition, .mermaid, blockquote {
    page-break-inside: avoid;
}
h1, h2, h3 {
    page-break-after: avoid;
}
"""

def md_path_to_html_path(md_rel_path: str) -> Path:
    p = Path(md_rel_path)
    if p.name == "index.md":
        # e.g. getting-started/index.md -> site/getting-started/index.html
        # or index.md -> site/index.html
        return SITE_DIR / p.parent / "index.html"
    else:
        # e.g. getting-started/installing-desktop-app.md -> site/getting-started/installing-desktop-app/index.html
        return SITE_DIR / p.parent / p.stem / "index.html"

def extract_flat_nav(items, section_prefix=""):
    flat = []
    for item in items:
        if isinstance(item, str):
            flat.append((section_prefix, item))
        elif isinstance(item, dict):
            for title, target in item.items():
                curr_title = f"{section_prefix} - {title}" if section_prefix else title
                if isinstance(target, str):
                    flat.append((curr_title, target))
                elif isinstance(target, list):
                    flat.extend(extract_flat_nav(target, curr_title))
    return flat

async def render_pages_to_pdf():
    print("Loading MkDocs configuration...")
    cfg = load_config(str(USER_GUIDE_DIR / "mkdocs.yml"))
    nav_items = extract_flat_nav(cfg["nav"])
    print(f"Total documents to convert: {len(nav_items)}")

    generated_pdf_files = []

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        for idx, (section_title, md_rel) in enumerate(nav_items, start=1):
            html_file = md_path_to_html_path(md_rel)
            if not html_file.exists():
                print(f"[{idx}/{len(nav_items)}] WARNING: HTML not found: {html_file}")
                continue

            safe_stem = md_rel.replace("/", "_").replace("\\", "_").replace(".md", "")
            out_pdf = INDIVIDUAL_PDF_DIR / f"{idx:03d}_{safe_stem}.pdf"

            try:
                # Load page
                await page.goto(html_file.as_uri(), wait_until="networkidle", timeout=30000)
                
                # Wait slightly for mermaid diagrams to render
                await page.wait_for_timeout(800)
                
                # Apply custom styles for pristine print quality
                await page.add_style_tag(content=PRINT_CUSTOM_CSS)

                # Export to PDF
                await page.pdf(
                    path=str(out_pdf),
                    format="A4",
                    print_background=True,
                    margin={"top": "15mm", "bottom": "15mm", "left": "15mm", "right": "15mm"}
                )
                generated_pdf_files.append((section_title, out_pdf))
                print(f"[{idx}/{len(nav_items)}] Generated: {out_pdf.name}")
            except Exception as e:
                print(f"[{idx}/{len(nav_items)}] ERROR rendering {md_rel}: {e}")

        await browser.close()

    print("\nMerging all PDFs into a single complete guide...")
    merger = pypdf.PdfWriter()

    for title, pdf_file in generated_pdf_files:
        if pdf_file.exists() and pdf_file.stat().st_size > 0:
            bookmark_title = title if title else pdf_file.stem
            merger.append(str(pdf_file), outline_item=bookmark_title)

    with open(FINAL_COMBINED_PDF, "wb") as f_out:
        merger.write(f_out)
    merger.close()

    final_size_mb = FINAL_COMBINED_PDF.stat().st_size / (1024 * 1024)
    print(f"\nSuccessfully generated combined PDF:")
    print(f"File: {FINAL_COMBINED_PDF}")
    print(f"Size: {final_size_mb:.2f} MB")
    print(f"Individual PDFs saved in: {INDIVIDUAL_PDF_DIR}")

if __name__ == "__main__":
    asyncio.run(render_pages_to_pdf())
