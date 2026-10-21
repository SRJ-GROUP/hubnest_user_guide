from pathlib import Path
from mkdocs.config import load_config
import pypdf

USER_GUIDE_DIR = Path("d:/hubnest/user_guide").resolve()
OUTPUT_DIR = USER_GUIDE_DIR / "generated_pdfs"
INDIVIDUAL_PDF_DIR = OUTPUT_DIR / "individual_pdfs"

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

def main():
    print("Loading MkDocs navigation...")
    cfg = load_config(str(USER_GUIDE_DIR / "mkdocs.yml"))
    nav_items = flatten_nav(cfg["nav"])
    print(f"Total documents: {len(nav_items)}")

    items_list = []
    for idx, (title, md_rel) in enumerate(nav_items, start=1):
        safe_stem = md_rel.replace("/", "_").replace("\\", "_").replace(".md", "")
        out_pdf = INDIVIDUAL_PDF_DIR / f"{idx:03d}_{safe_stem}.pdf"
        items_list.append((idx, title, md_rel, out_pdf))

    # Verify how many individual PDFs exist
    existing = [item for item in items_list if item[3].exists() and item[3].stat().st_size > 0]
    print(f"Found {len(existing)}/{len(items_list)} rendered individual PDFs on disk!")

    # 1. Group into modules
    module_files = {}
    for idx, title, md_rel, out_pdf in items_list:
        if out_pdf.exists() and out_pdf.stat().st_size > 0:
            mod = classify_module(md_rel)
            if mod not in module_files:
                module_files[mod] = []
            module_files[mod].append((title, out_pdf))

    module_summaries = []
    for mod_name, files in sorted(module_files.items()):
        mod_pdf_path = OUTPUT_DIR / f"{mod_name}.pdf"
        print(f"Building {mod_pdf_path.name} ({len(files)} chapters)...")
        merger = pypdf.PdfWriter()
        for title, pdf_path in files:
            # Clean bookmark title
            parts = [p.strip() for p in title.split(">")]
            bm = parts[-1] if parts else title
            merger.append(str(pdf_path), outline_item=bm)

        with open(mod_pdf_path, "wb") as f_out:
            merger.write(f_out)
        merger.close()

        size_mb = mod_pdf_path.stat().st_size / (1024 * 1024)
        reader = pypdf.PdfReader(str(mod_pdf_path))
        page_count = len(reader.pages)
        module_summaries.append((mod_pdf_path.name, page_count, size_mb, str(mod_pdf_path)))
        print(f"  -> Generated {mod_pdf_path.name}: {page_count} pages ({size_mb:.2f} MB)")

    # 2. Master Combined PDF
    print("\nBuilding Master Combined Enterprise User Guide...")
    master_pdf_path = OUTPUT_DIR / "HubNest_Complete_Enterprise_User_Guide.pdf"
    master_merger = pypdf.PdfWriter()

    current_module = None
    for idx, title, md_rel, out_pdf in items_list:
        if out_pdf.exists() and out_pdf.stat().st_size > 0:
            mod = classify_module(md_rel)
            parts = [p.strip() for p in title.split(">")]
            bm_title = " > ".join(parts[-2:]) if len(parts) >= 2 else parts[0]
            master_merger.append(str(out_pdf), outline_item=bm_title)

    with open(master_pdf_path, "wb") as f_out:
        master_merger.write(f_out)
    master_merger.close()

    master_size_mb = master_pdf_path.stat().st_size / (1024 * 1024)
    master_pages = len(pypdf.PdfReader(str(master_pdf_path)).pages)
    print(f"  -> Generated Master Guide: {master_pages} pages ({master_size_mb:.2f} MB)")

    print("\n==================================================")
    print("ALL MODULE AND MASTER PDF BOOKS GENERATED!")
    print("==================================================")
    for name, pages, sz, path in module_summaries:
        print(f" * {name}: {pages} pages, {sz:.2f} MB")
    print(f" * HubNest_Complete_Enterprise_User_Guide.pdf: {master_pages} pages, {master_size_mb:.2f} MB")

if __name__ == "__main__":
    main()
