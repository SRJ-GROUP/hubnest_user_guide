import os
import sys
import time
import asyncio
from pathlib import Path
from mkdocs.config import load_config
from playwright.async_api import async_playwright
import pypdf

USER_GUIDE_DIR = Path("d:/hubnest/user_guide").resolve()
SITE_DIR = USER_GUIDE_DIR / "site"
OUTPUT_DIR = USER_GUIDE_DIR / "generated_pdfs"
INDIVIDUAL_PDF_DIR = OUTPUT_DIR / "individual_pdfs"

INDIVIDUAL_PDF_DIR.mkdir(parents=True, exist_ok=True)

COMPACT_PRINT_CSS = """
@page {
    size: A4;
    margin: 10mm 10mm 12mm 10mm;
}

/* Hide web navigation, search, sidebar, footer, back to top, feedback, zoom buttons */
.md-header, .md-tabs, .md-sidebar, .md-footer, .hubnest-eye-btn, .diagram-eye-btn,
.hubnest-popup-overlay, .md-top, .md-content__button, nav.md-path, .md-feedback,
.diagram-zoom-wrapper > button {
    display: none !important;
}

/* Eliminate excessive web layout padding */
.md-container {
    padding: 0 !important;
}
.md-main {
    padding: 0 !important;
}
.md-main__inner {
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
}
.md-content {
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
}
.md-content__inner {
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
}

/* Compact typography & color */
body, .md-typeset {
    background: #ffffff !important;
    color: #0f172a !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    font-size: 9.5pt !important;
    line-height: 1.34 !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}

/* Compact headings without awkward page breaks */
.md-typeset h1 {
    font-size: 15.5pt !important;
    line-height: 1.2 !important;
    margin: 0 0 6pt 0 !important;
    color: #1e1b4b !important;
    border-bottom: 1.5pt solid #6366f1 !important;
    padding-bottom: 3pt !important;
    page-break-after: avoid !important;
}
.md-typeset h2 {
    font-size: 12.5pt !important;
    line-height: 1.25 !important;
    margin: 9pt 0 3pt 0 !important;
    color: #312e81 !important;
    border-bottom: 0.5pt solid #cbd5e1 !important;
    padding-bottom: 2pt !important;
    page-break-after: avoid !important;
}
.md-typeset h3 {
    font-size: 10.5pt !important;
    line-height: 1.3 !important;
    margin: 7pt 0 2pt 0 !important;
    color: #4338ca !important;
    page-break-after: avoid !important;
}
.md-typeset h4, .md-typeset h5 {
    font-size: 9.5pt !important;
    margin: 5pt 0 2pt 0 !important;
    page-break-after: avoid !important;
}

/* Compact paragraphs and lists */
.md-typeset p {
    margin-bottom: 4.5pt !important;
    margin-top: 0 !important;
}
.md-typeset ul, .md-typeset ol {
    margin-top: 0 !important;
    margin-bottom: 4.5pt !important;
    padding-left: 16pt !important;
}
.md-typeset li {
    margin-bottom: 1.5pt !important;
}

/* Compact tables */
.md-typeset table:not([class]) {
    font-size: 8.5pt !important;
    border-collapse: collapse !important;
    width: 100% !important;
    margin: 5pt 0 !important;
    page-break-inside: avoid !important;
}
.md-typeset table:not([class]) th {
    background-color: #f1f5f9 !important;
    color: #0f172a !important;
    font-weight: 600 !important;
    padding: 3.5pt 6pt !important;
    border: 0.5pt solid #cbd5e1 !important;
}
.md-typeset table:not([class]) td {
    padding: 3pt 6pt !important;
    border: 0.5pt solid #e2e8f0 !important;
    line-height: 1.25 !important;
}
.md-typeset table:not([class]) tr:nth-child(even) {
    background-color: #f8fafc !important;
}

/* Compact code blocks */
.md-typeset pre {
    font-size: 8pt !important;
    line-height: 1.25 !important;
    margin: 4.5pt 0 !important;
    padding: 5pt 7pt !important;
    border-radius: 3pt !important;
    page-break-inside: avoid !important;
    background-color: #0f172a !important;
    color: #f8fafc !important;
}
.md-typeset code {
    font-size: 8.5pt !important;
    padding: 1pt 3pt !important;
    border-radius: 2pt !important;
}

/* Compact admonitions / callout boxes */
.md-typeset .admonition {
    font-size: 8.5pt !important;
    margin: 5pt 0 !important;
    padding: 0 7pt 3.5pt 7pt !important;
    border-radius: 3pt !important;
    page-break-inside: avoid !important;
}
.md-typeset .admonition-title {
    font-size: 9pt !important;
    font-weight: 600 !important;
    padding: 2.5pt 0 !important;
    margin-bottom: 2.5pt !important;
}

/* Diagrams and SVGs */
.mermaid {
    text-align: center !important;
    margin: 5pt auto !important;
    page-break-inside: avoid !important;
}
.mermaid svg {
    max-width: 95% !important;
    max-height: 380pt !important;
    height: auto !important;
    display: inline-block !important;
}

/* Clean images */
img {
    max-width: 95% !important;
    height: auto !important;
    display: block !important;
    margin: 5pt auto !important;
    border-radius: 3pt !important;
    page-break-inside: avoid !important;
}

/* Compact grid cards if present */
.grid.cards > ul > li {
    page-break-inside: avoid !important;
    margin-bottom: 5pt !important;
}
"""

def md_path_to_html_path(md_rel_path: str) -> Path:
    p = Path(md_rel_path)
    if p.name == "index.md":
        return SITE_DIR / p.parent / "index.html"
    else:
        return SITE_DIR / p.parent / p.stem / "index.html"

def flatten_nav(items, path_prefix=""):
    flat = []
    for item in items:
        if isinstance(item, str):
            flat.append((path_prefix, item))
        elif isinstance(item, dict):
            for title, target in item.items():
                cur = f"{path_prefix} > {title}" if path_prefix else title
                if isinstance(target, str):
                    flat.append((cur, target))
                elif isinstance(target, list):
                    flat.extend(flatten_nav(target, cur))
    return flat

def classify_module(md_path: str) -> str:
    if "hrms" in md_path:
        return "02_HubNest_HubHRMS_User_Guide"
    elif "crm" in md_path:
        return "03_HubNest_HubCRM_User_Guide"
    elif "notification" in md_path:
        return "04_HubNest_HubNotification_User_Guide"
    elif "calling" in md_path:
        return "05_HubNest_CallingHub_User_Guide"
    elif "meet" in md_path:
        return "06_HubNest_HubMeet_User_Guide"
    elif "desktop" in md_path or "windows" in md_path:
        return "07_HubNest_Desktop_App_User_Guide"
    else:
        return "01_HubNest_Platform_Super_Admin_Guide"

async def render_worker(queue, browser, results, total_count, counter_lock, counter_ref):
    page = await browser.new_page()
    while not queue.empty():
        try:
            item = queue.get_nowait()
        except asyncio.QueueEmpty:
            break

        idx, full_title, md_path, html_path, out_pdf = item
        
        async with counter_lock:
            counter_ref[0] += 1
            current_num = counter_ref[0]

        # Fresh render with compact styling (overwrite any old files)

        rendered = False
        for attempt in range(2):
            try:
                await page.goto(html_path.as_uri(), wait_until="networkidle", timeout=20000)
                await page.wait_for_timeout(400)
                await page.add_style_tag(content=COMPACT_PRINT_CSS)

                await page.pdf(
                    path=str(out_pdf),
                    format="A4",
                    print_background=True,
                    margin={"top": "10mm", "bottom": "12mm", "left": "10mm", "right": "10mm"},
                    display_header_footer=True,
                    header_template=f'<div style="font-size:7pt; color:#64748b; width:100%; text-align:right; padding-right:10mm; font-family:sans-serif;">{full_title}</div>',
                    footer_template='<div style="font-size:7pt; color:#64748b; width:100%; display:flex; justify-content:space-between; padding:0 10mm; font-family:sans-serif;"><span>HubNest Enterprise Suite User Guide</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>'
                )
                results[idx] = (full_title, md_path, out_pdf)
                size_kb = out_pdf.stat().st_size / 1024
                print(f"[{current_num}/{total_count}] Rendered: {out_pdf.name} ({size_kb:.1f} KB)")
                rendered = True
                break
            except Exception as e:
                print(f"[{current_num}/{total_count}] Attempt {attempt+1} failed for {md_path}: {e}")
                await asyncio.sleep(1)

        if not rendered:
            print(f"[{current_num}/{total_count}] FAILED to render {md_path}")

        queue.task_done()

    await page.close()

async def main():
    start_time = time.time()
    print("==================================================")
    print("HubNest Documentation -> Compact PDF Conversion")
    print("==================================================")

    print("1. Loading MkDocs Navigation...")
    cfg = load_config(str(USER_GUIDE_DIR / "mkdocs.yml"))
    nav_items = flatten_nav(cfg["nav"])
    total_docs = len(nav_items)
    print(f"Total documents to convert: {total_docs}")

    # Build queue items
    queue = asyncio.Queue()
    items_list = []
    for idx, (title, md_rel) in enumerate(nav_items, start=1):
        html_file = md_path_to_html_path(md_rel)
        safe_stem = md_rel.replace("/", "_").replace("\\", "_").replace(".md", "")
        out_pdf = INDIVIDUAL_PDF_DIR / f"{idx:03d}_{safe_stem}.pdf"
        item = (idx, title, md_rel, html_file, out_pdf)
        items_list.append(item)
        queue.put_nowait(item)

    # Concurrency pool
    NUM_WORKERS = 4
    results = {}
    counter_ref = [0]
    counter_lock = asyncio.Lock()

    print(f"2. Launching {NUM_WORKERS} parallel rendering workers...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        workers = [
            asyncio.create_task(
                render_worker(queue, browser, results, total_docs, counter_lock, counter_ref)
            )
            for _ in range(NUM_WORKERS)
        ]
        await asyncio.gather(*workers)
        await browser.close()

    render_duration = time.time() - start_time
    print(f"\nCompleted rendering {len(results)}/{total_docs} pages in {render_duration:.1f}s!")

    # 3. Assemble Module PDFs
    print("\n3. Merging individual pages into Module PDF Guides...")
    module_files = {}
    for idx, title, md_rel, html_file, out_pdf in items_list:
        if idx in results:
            mod = classify_module(md_rel)
            if mod not in module_files:
                module_files[mod] = []
            module_files[mod].append((title, out_pdf))

    module_summaries = []
    for mod_name, files in sorted(module_files.items()):
        mod_pdf_path = OUTPUT_DIR / f"{mod_name}.pdf"
        print(f"   Building {mod_pdf_path.name} ({len(files)} chapters)...")
        merger = pypdf.PdfWriter()
        for title, pdf_path in files:
            if pdf_path.exists() and pdf_path.stat().st_size > 0:
                bookmark_name = title.split(">")[-1].strip() if ">" in title else title
                merger.append(str(pdf_path), outline_item=bookmark_name)

        with open(mod_pdf_path, "wb") as f_out:
            merger.write(f_out)
        merger.close()

        size_mb = mod_pdf_path.stat().st_size / (1024 * 1024)
        reader = pypdf.PdfReader(str(mod_pdf_path))
        page_count = len(reader.pages)
        module_summaries.append((mod_pdf_path.name, page_count, size_mb))
        print(f"   -> Created {mod_pdf_path.name}: {page_count} pages, {size_mb:.2f} MB")

    # 4. Master Combined PDF
    print("\n4. Building Master Enterprise Combined PDF Guide...")
    master_pdf_path = OUTPUT_DIR / "HubNest_Complete_Enterprise_User_Guide.pdf"
    master_merger = pypdf.PdfWriter()
    
    for idx, title, md_rel, html_file, out_pdf in items_list:
        if out_pdf.exists() and out_pdf.stat().st_size > 0:
            # Build clean hierarchical bookmark
            parts = [p.strip() for p in title.split(">")]
            bm_title = " > ".join(parts[-2:]) if len(parts) >= 2 else parts[0]
            master_merger.append(str(out_pdf), outline_item=bm_title)

    with open(master_pdf_path, "wb") as f_out:
        master_merger.write(f_out)
    master_merger.close()

    master_size_mb = master_pdf_path.stat().st_size / (1024 * 1024)
    master_pages = len(pypdf.PdfReader(str(master_pdf_path)).pages)
    print(f"   -> Created Master Guide: {master_pages} pages, {master_size_mb:.2f} MB")

    total_time = time.time() - start_time
    print("\n==================================================")
    print(f"All PDF Conversions Completed in {total_time:.1f} seconds!")
    print(f"Output Directory: {OUTPUT_DIR}")
    print("==================================================")
    for name, pages, sz in module_summaries:
        print(f" - {name}: {pages} pages ({sz:.2f} MB)")
    print(f" - HubNest_Complete_Enterprise_User_Guide.pdf: {master_pages} pages ({master_size_mb:.2f} MB)")

if __name__ == "__main__":
    asyncio.run(main())
