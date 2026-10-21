import time
from pathlib import Path
import fitz  # PyMuPDF

OUTPUT_DIR = Path("d:/hubnest/user_guide/generated_pdfs").resolve()
MASTER_PDF = OUTPUT_DIR / "HubNest_Complete_Enterprise_User_Guide.pdf"

module_files = [
    ("1. HubNest Platform & Enterprise Master Administration", OUTPUT_DIR / "01_HubNest_Platform_Super_Admin_Guide.pdf"),
    ("2. HubHRMS Complete Suite (7 Roles)", OUTPUT_DIR / "02_HubNest_HubHRMS_User_Guide.pdf"),
    ("3. HubCRM Enterprise Suite (7 Roles)", OUTPUT_DIR / "03_HubNest_HubCRM_User_Guide.pdf"),
    ("4. HubNotification Omnichannel Suite (6 Roles)", OUTPUT_DIR / "04_HubNest_HubNotification_User_Guide.pdf"),
    ("5. Calling Hub VoIP & Telephony Suite (4 Roles)", OUTPUT_DIR / "05_HubNest_CallingHub_User_Guide.pdf"),
    ("6. HubMeet Video Conferencing Suite (4 Roles)", OUTPUT_DIR / "06_HubNest_HubMeet_User_Guide.pdf"),
    ("7. HubNest OS Desktop App & IT Administration", OUTPUT_DIR / "07_HubNest_Desktop_App_User_Guide.pdf"),
]

def main():
    t0 = time.time()
    print("PyMuPDF: Assembling Master Combined Enterprise User Guide...")
    master_doc = fitz.open()

    toc = []  # Table of Contents outline: [lvl, title, page]
    current_page = 1

    for mod_title, path in module_files:
        if not path.exists():
            print(f"ERROR: {path} not found!")
            continue

        print(f"Adding {mod_title} ({path.name})...")
        sub_doc = fitz.open(str(path))
        sub_page_count = len(sub_doc)
        
        # Add top-level bookmark for this module
        toc.append([1, mod_title, current_page])

        # Extract existing bookmarks from sub-doc and offset page numbers
        sub_toc = sub_doc.get_toc()
        for lvl, item_title, item_page in sub_toc:
            toc.append([lvl + 1, item_title, current_page + item_page - 1])

        master_doc.insert_pdf(sub_doc)
        current_page += sub_page_count
        sub_doc.close()

    print(f"Total pages: {len(master_doc)}. Applying Table of Contents bookmarks...")
    master_doc.set_toc(toc)

    print(f"Saving PDF to {MASTER_PDF.name}...")
    master_doc.save(str(MASTER_PDF))
    master_doc.close()

    dt = time.time() - t0
    size_mb = MASTER_PDF.stat().st_size / (1024 * 1024)
    print(f"SUCCESS! Created {MASTER_PDF.name} in {dt:.2f}s ({len(master_doc) if 'master_doc' in locals() and not master_doc.is_closed else current_page - 1} pages, {size_mb:.2f} MB)")

if __name__ == "__main__":
    main()
